
interface ProductFilterRequestType extends Request{
  query: {
    id?: string,
    sku?: string,
    name?: object,
    category?: object,
    active?: boolean,
  }
}

export default ProductFilterRequestType;