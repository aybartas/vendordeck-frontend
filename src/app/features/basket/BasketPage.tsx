import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from '../../context/Context';
import { Box } from "@mui/system";
import { apiAgent } from "../../api/ApiService";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

export default function BasketPage() {

  const {basket,setBasket,removeItem}= useStoreContext();
  const [loading,setLoading] = useState(false);


  function handleAddItemToBasket(productId : number){
    setLoading(true);
    apiAgent.Basket.addItem(productId,1)
    .then(basket => setBasket(basket))
    .catch(error => console.log(error))
    .finally(() => {
      console.log("add item finally");
      setLoading(false);
    });
    
  }

  function handleRemoveItemFromBasket(productId: number, quantity = 1 ){
    setLoading(true);
    apiAgent.Basket.removeItem(productId,quantity)
    .then(() => removeItem(productId,quantity))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }

  if (!basket) return <Typography> Basket is empty</Typography>;

  console.log("basketpage will return");
  console.log("basthfddfgn");

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subcost</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.basketItems.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="item">
                <Box display = 'flex' alignItems ='center'>
                  <img src = {item.imageUrl} alt = {item.productName} style = {{height : 50 , marginRight : 20 }}></img>
                  <span>{item.productName}</span>
                </Box>
              </TableCell>
              <TableCell align="right"> ${(item.price/100).toFixed(2)}</TableCell>
              <TableCell align="center">
                <LoadingButton loading = {loading} color = 'error' onClick={() => handleRemoveItemFromBasket(item.productId)}>
                  <Remove/>
                </LoadingButton>
                {item.quantity}
                <LoadingButton loading = {loading} color = 'secondary' onClick={() => handleAddItemToBasket(item.productId)}>
                  <Add/>
                </LoadingButton>
                </TableCell>
              <TableCell align="right">${(item.price * item.quantity / 100).toFixed(2) }</TableCell>
              <TableCell align="right">
                  <LoadingButton color= 'error' onClick={() => handleRemoveItemFromBasket(item.productId,item.quantity)}>
                     <Delete />
                  </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
