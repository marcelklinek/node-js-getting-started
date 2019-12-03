import { HttpServer, requestHandler } from './http-server';

function startServer() {
	const port = process.env.PORT || 3000;

	new HttpServer(requestHandler, port).init();
}	

startServer()
