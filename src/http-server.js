import http from 'http';
import url from 'url';

export class HttpServer {

	constructor(handlerFunction, port, host) {
		this.handlerFunction = handlerFunction;
		this.port = port;
		this.host = host;
	}

	init() {
		const myServer = http.createServer(this.handlerFunction);
		return myServer.listen(this.port, this.host);
	}

}

export function requestHandler(req, res) {
	const parsedUrl = url.parse(req.url, true);
	res.setHeader('Access-Control-Allow-Origin', '*');
	if (req.method == 'GET') {
		if (parsedUrl.pathname == '/getAd') {
			const publisherId = parsedUrl.query.publisherId;
			if (publisherId == null) {
				res.writeHead(422, {'Content-Type': 'text/html'});
				res.end();
				return;
			}
			const msg = `Publisher with id ${publisherId} requested an ad`
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(msg);
			res.end();
		} else {
			res.writeHead(404, {'Content-Type': 'text/html'})
		}
	} else {
		res.writeHead(405, {'Content-Type': 'text/html'});
		res.end();
	}
	res.end();

}