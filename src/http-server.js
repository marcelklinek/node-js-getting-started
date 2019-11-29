import http from 'http';

export class HttpServer {

    constructor(handlerFn, port) {
        this.handlerFn = handlerFn;
        this.port = port;
    }
    
    init() {
        return http.createServer(this.handlerFn).listen(this.port);
    }
}

export function requestHandler(req, res) {
    if (req.method == 'GET') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('Text Ad');
    } else {
        res.writeHead(405);
    }
    res.end();
}
