interface ProductFilterRequestType extends Request {
  query: {
    initialPrice?: number
    finalPrice?: number
  }
}

export default ProductFilterRequestType;