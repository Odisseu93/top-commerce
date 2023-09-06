import { Express } from 'express';

interface TypedRequestBody<T> extends Express.Request {
  body: T
}

export default TypedRequestBody;