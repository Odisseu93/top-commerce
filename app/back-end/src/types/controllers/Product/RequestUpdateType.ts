import { Request } from 'express';

interface RequestUpdateType extends Request {
  params: {
    id: string
  },
  body: {
    sku: string,
    name: string,
    price: number,
    description: string,
    CategoryId: string,
    active: boolean
  }
}

export default RequestUpdateType;