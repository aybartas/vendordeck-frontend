import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Fragment } from "react";
import { Product } from "../../app/models/product";

interface Props {
    products: Product [];
    addProduct:() => void;
}

export default function Catalog({products,addProduct}: Props) {
  return (
    <Fragment>
      <h1>Catalog</h1>
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
              <ListItemAvatar>
                  <Avatar src= {product.imageUrl}></Avatar>
              </ListItemAvatar>
              <ListItemText>
                  {product.name} - {product.price}
              </ListItemText>
          </ListItem>
        ))}
      </List>
    </Fragment>
  );
}
