import { useEffect, useState } from "react";
import { Basket } from "../../app/models/basket";
import { apiAgent } from '../../app/api/ApiService';
import { CircularProgress, Typography } from "@mui/material";

export default function BasketPage(){
    const [loading,setLoading] = useState(true);
    const [basket,setBasket] = useState< Basket | null >(null);

    useEffect(() => {
        apiAgent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    },[]);
    
    if(loading) return (<CircularProgress />)      
    
    if(!basket) return (<Typography> Basket is empty</Typography>)

    return (<h1>Basket {basket.buyerId} </h1>)
}