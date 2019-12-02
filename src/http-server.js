import http from 'http';
import url from 'url';

export class HttpServer {

    constructor(handlerFn, port, host) {
        this.handlerFn = handlerFn;
        this.port = port;
        this.host = host;
    }
    
    init() {
        if (this.host) {
            return http.createServer(this.handlerFn).listen(this.port, this.host);
        } else {
            return http.createServer(this.handlerFn).listen(this.port);
        }
    }
}

export function requestHandler(req, res) {
    const parsedUrl = url.parse(req.url,true);

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
        } else {
            res.writeHead(404);
        }
    } else {
        res.writeHead(405);
    }
    res.end();
}
