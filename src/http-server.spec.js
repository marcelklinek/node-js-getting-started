import { createSandbox } from 'sinon';
import request from 'supertest';
import { HttpServer, requestHandler } from './http-server';
import http from 'http';
import { expect } from 'chai';
import {tag} from './tag';

describe('HTTP server: ', () => {

    var sandboxHandler;
    var createServerStub;
    var httpServer;
    var serverListenSpy;
    var app;
    
    const expectedHost = "127.0.0.1"
    const expectedPort = 9001;

    beforeEach(() => {
        sandboxHandler = createSandbox();
    });

    afterEach(() => {
        sandboxHandler.restore();
    });

    describe('when asked to init', () => {
        
        const expectedHandlerFn = (req, res) => {
            res.end();
        };

        beforeEach(() => {
            serverListenSpy = sandboxHandler.spy();
            createServerStub = sandboxHandler.stub(http, 'createServer').returns({
                listen: serverListenSpy
            });
            httpServer = new HttpServer(expectedHandlerFn, expectedPort, expectedHost);
            httpServer.init();
        });

        it('should create a server instance', () => {
            expect(createServerStub).to.have.been.called;
        });

        it('should configure it to listen on correct host and port', ()=>{
            expect(serverListenSpy).to.be.calledWith(expectedPort, expectedHost);
        });

        it('should configure it to listen on correct port', ()=>{
            expect(serverListenSpy).to.be.calledWith(expectedPort);
        });

        it('should bind the correct handler in the creation of the server', () => {
            expect(createServerStub).to.be.calledOnceWith(expectedHandlerFn);
        });
        
    });

    describe('when request to getAd is sent to the server', () => {

        beforeEach(() => {
            httpServer = new HttpServer(requestHandler, expectedPort, expectedHost);
            app = httpServer.init();
        });

        it('should send cors headers in the response', (done) => {
            const errorCode = 404;

            request(app)
                .get('/')
                .expect(errorCode)
                .end((err, res) => {
                    if (err) return done(err);
                    const expectedHeader = {"access-control-allow-origin": "*"};
                    expect(res.header).to.include(expectedHeader);
                    done();
                });
        });

        describe('and it is a POST request', () => {
            it('should reply with Method Not Allowed error', (done) => {
                const errorCode = 405;

                request(app)
                  .post('/')
                  .expect(errorCode, done);
            });
        });

        describe('and it is a GET request for an ad', () => {

            describe('when the request does not contain publisher id', () => {
                it('should respond with unprocessable entity error', (done) => {
                    const errorCode = 422;

                    request(app)
                      .get('/getAd')
                      .expect(errorCode, done);
                });
            });

            it('should reply with OK and return an ad for the requested publisher', (done) => {
                const okCode = 200;
                
                request(app)
                  .get('/getAd')
                  .query({ publisherId: 'MyPublisherId' })
                  .expect(okCode)
                  .end((err, res) => {
                    if (err) return done(err);
                    const expectedMessage = `Publisher with id MyPublisherId requested an ad`
                    expect(res.text).to.equal(expectedMessage);
                    done();
                  });
            });
        });

        describe('and it is a different GET request', () => {
            it('should reply with OK', (done) => {
                const notFoundCode = 404;

                request(app)
                  .get('/getSomethingElse')
                  .expect(notFoundCode, done);
            });
        });

        afterEach(() => {
            app.close();
        });
    });

    describe('when request to getTag is sent to the server', () => {
        
        beforeEach(() => {
            httpServer = new HttpServer(requestHandler, expectedPort, expectedHost);
            app = httpServer.init();
        });

        it('should return the code to embed in the page to call the ad server', (done) => {
            const okCode = 200;
                
            request(app)
                .get('/getTag')
                .expect(okCode)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.text).to.equal(tag);
                    done();
                });
        });

        afterEach(() => {
            app.close();
        });
    });

});
