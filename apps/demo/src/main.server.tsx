import type { Request, Response } from 'express';
import * as ReactDOMServer from 'react-dom/server';
import isbot from 'isbot'

import App from './app/app';

export function handleRequest(req: Request, res: Response) {
  let didError = false;
  const callbackName = isbot(req.headers['user-agent']) ? 'onAllReady' : 'onShellReady';
  const stream = ReactDOMServer.renderToPipeableStream(
    <App />,
    {
      [callbackName]() {
        res.statusCode = didError ? 500 : 200;
        res.setHeader('Content-type', 'text/html; charset=utf-8');
        stream.pipe(res);
      },
      onShellError(error) {
        console.error(error);
        res.statusCode = 500;
        res.send('<!doctype html><h1>Server Error</h1>');
      },
      onError(error) {
        didError = true;
        console.error(error);
      }
    }
  );
}

