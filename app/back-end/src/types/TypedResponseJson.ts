import { Response } from 'express';
import { Send } from 'express-serve-static-core';


export interface TypedResponseJson<ResBody> extends Response {
  json: Send<ResBody, this>;
}

export default TypedResponseJson;