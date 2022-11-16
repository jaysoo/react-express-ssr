import express from 'express';
import type { Request, Response } from 'express';
import * as path from 'path';
import { handleRequest } from './main.server';

const port = process.env['port'] || 4200;
const app = express();

app.use('*', handleRequest);

const server = app.listen(port, () => {
  console.log(`[ ready ] on http://localhost:${port}`);
});

server.on('error', console.error);
