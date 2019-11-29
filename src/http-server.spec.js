import { createSandbox } from 'sinon';
import request from 'supertest';
import { HttpServer, requestHandler } from './http-server';
import http from 'http';
import { expect } from 'chai';

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
            httpServer = new HttpServer(expectedHandlerFn, expectedHost, expectedPort);
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

    describe('when request is sent to the server', () => {

        beforeEach(() => {
            httpServer = new HttpServer(requestHandler, expectedHost, expectedPort);
            app = httpServer.init();
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
            it('should reply with OK', (done) => {
                const okCode = 200;

                request(app)
                  .get('/getAd')
                  .expect(okCode, done);
            });
        });

        afterEach(() => {
            app.close();
        });
    });

});
