import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'url';
import jsonServer from 'json-server';
import path from 'path';

const server = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), 'database.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const parsedUrl = parse(req.url!, true);
    if (parsedUrl.pathname!.startsWith('/api')) {
        server(req, res);
    } else {
        res.status(404).send('Not Found');
    }
};

export default handler;