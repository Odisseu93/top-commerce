import { Query } from 'express-serve-static-core';
import { Request } from 'express';

export interface TypedRequestQuery<T extends Query> extends Request {
  query: T
}

export default TypedRequestQuery;