import {HttpServer} from './http-server';

function startServer() {
	const port = process.env.PORT || 3000;

	new HttpServer(HttpServer.requestHandler, port).init();
}	

startServer()
