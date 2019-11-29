import http from 'http';

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
    if (req.method == 'GET' && req.url == '/getAd') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('Text Ad');
    } else {
        res.writeHead(405);
    }
    res.end();
}
