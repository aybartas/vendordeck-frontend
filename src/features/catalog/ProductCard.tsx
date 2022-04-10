import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  return (
    <Card>
      <CardHeader
        titleTypographyProps={{
                sx: {fontWeight: 'bold', color:''}
        }}
        avatar={<Avatar>{product.name.charAt(0).toUpperCase()}</Avatar>}
        title={product.name}
      />
      <CardMedia
       component="img" 
       height="140"
       sx = {{height:140,backgroundSize: 'contain', bgcolor:'primary.light' }} 
       image={product.imageUrl} />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          ${(product.price/100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add To Cart</Button>
        <Button component = {Link} to = {`/catalog/${product.id}`}  size="small">View</Button>
      </CardActions>
    </Card>
  );
}
