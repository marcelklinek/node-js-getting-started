import http from 'http';
import url from 'url';
import {tag} from './tag';

export class HttpServer {

    constructor(handlerFn, port, host) {
        this.handlerFn = handlerFn;
        this.port = port;
        this.host = host;
    }
    
    init() {
        return http.createServer(this.handlerFn).listen(this.port);
    }

    static requestHandler(req, res) {
        const parsedUrl = url.parse(req.url, true);
        res.setHeader('Access-Control-Allow-Origin', '*');
    
        if (req.method == 'GET') {
            const publisherId = parsedUrl.query.publisherId;
            const containsPublisherId = publisherId ? true : false;
    
            if (parsedUrl.pathname == '/getAd') { 
                if (containsPublisherId) {
                    const msg = `Publisher with id ${publisherId} requested an ad`;
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(msg);
                } else {
                    res.writeHead(422);
                }
            } else if (parsedUrl.pathname == '/getTag') {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(tag);
            } else {
                res.writeHead(404);
            }
        } else {
            res.writeHead(405);
        }
        
        res.end();
    }
}
