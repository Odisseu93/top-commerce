import TypedRequestBody from '../../TypedRequestBody.js';

type RequestCreateType = TypedRequestBody<{
  sku: string,
  name: string,
  price: number,
  description: string,
  CategoryId: string,
}>

export default RequestCreateType;