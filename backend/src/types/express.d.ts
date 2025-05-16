import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

declare module 'express' {
  interface Request extends ExpressRequest {}
  interface Response extends ExpressResponse {}

  interface Router {
    get(path: string, handler: (req: Request, res: Response) => any): this;
    post(path: string, handler: (req: Request, res: Response) => any): this;
    put(path: string, handler: (req: Request, res: Response) => any): this;
    patch(path: string, handler: (req: Request, res: Response) => any): this;
    delete(path: string, handler: (req: Request, res: Response) => any): this;
  }
} 