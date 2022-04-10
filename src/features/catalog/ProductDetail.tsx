import { Divider, Grid, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from '../../app/models/product';

interface ProductDetailUrlParams {
    id : string
}

export default function ProductDetail (){

    const {id} =  useParams<ProductDetailUrlParams>();
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5050/api/Products/${id}`)
        .then(response => setCurrentProduct(response.data))
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false))
      },[id]);

      console.log("productdetail will return");
    if(isLoading) return <h3> Loading...</h3>

    if(!currentProduct) return <h3>Product not found </h3>
    return (
        <Grid container spacing = {6}>
            <Grid item xs = {6}>
                < img src = {currentProduct.imageUrl} alt = {currentProduct.name} style = {{width: '100%'}}/>
            </Grid>
            <Grid item xs = {6}>
                <Typography variant="h3"> {currentProduct.name}</Typography>
                <Divider></Divider>
                <Typography variant="h4"> ${(currentProduct.price/100).toFixed(2)}</Typography>
                <TableContainer sx = {{mt:'3rem'}}>
                    <TableBody>
                        <TableRow>
                                <TableCell> Name</TableCell>
                                <TableCell> {currentProduct.name}</TableCell>
                        </TableRow>
                        <TableRow>
                                <TableCell> Description</TableCell>
                                <TableCell> {currentProduct.description}</TableCell>
                        </TableRow>
                        <TableRow>
                                <TableCell> Brand</TableCell>
                                <TableCell> {currentProduct.brand}</TableCell>
                        </TableRow>
                    </TableBody>
                </TableContainer>
            </Grid>
        </Grid>
    );
}