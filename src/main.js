import { HttpServer, requestHandler } from './http-server';

function startServer() {
	const port = process.env.PORT;

	new HttpServer(requestHandler, port).init();
}	
// call http://localhost:9001/getAd
startServer()
