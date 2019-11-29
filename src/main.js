import { HttpServer, requestHandler } from './http-server';

function startServer() {
	const host = "127.0.0.1"
	const port = process.env.PORT || 500

	new HttpServer(requestHandler, host, port).init();
}	
// call http://localhost:9001/getAd
startServer()