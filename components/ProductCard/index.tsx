import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

import { IProduct } from "ts/interfaces/product";

const ProductCard = ({ product }: { product: IProduct }) => (
  <Card>
    <CardMedia
      component="img"
      height="180"
      image={product.thumbnail}
      alt={product.title}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {product.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {product.description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Rating: {product.rating}</Button>
      <Button size="small">Price: {product.price}</Button>
      <Button size="small">Brand: {product.brand}</Button>
    </CardActions>
  </Card>
);

export default ProductCard;
