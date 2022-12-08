import { Grid } from '@mui/material'

import ProductCard from "components/ProductCard"
import { IProduct } from "ts/interfaces/product"

const ProductsList = ({ products }: { products: IProduct[] }) => {
  return (
    <Grid container spacing={4}>
      { products.map((product: IProduct) => (
        <Grid item xs={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      )) }
    </Grid>
  )
}

export default ProductsList;
