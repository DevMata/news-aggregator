import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ValidateSearchMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): string {
    if (!req.query['q']) {
      return 'No q query param';
    }

    next();
  }
}
