import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Basket } from "../models/basket";

interface ContextValue {
    basket : Basket | null ;
    setBasket : (basket : Basket) => void;
    removeItem : (productId : number , quantity : number) => void;
}

export const StoreContext = createContext<ContextValue | undefined>(undefined);

export function useStoreContext(){
    const context = useContext(StoreContext);
    if(context === undefined){
        throw Error("The component is not inside the provider");
    }
    return context;
}

export function ContextProvider({children}: PropsWithChildren<any>){

    const [basket,setBasket] = useState<Basket | null>(null);

    function removeItem(productId: number, quantity: number){
        if(!basket) return;
        const items = [...basket.basketItems];
        const itemToRemove = items.findIndex(I => I.productId = productId);
        
        if(itemToRemove <0) return;
        items[itemToRemove].quantity -= quantity;

        if( items[itemToRemove].quantity <= 0){
            items.splice(itemToRemove,1);
        }

        setBasket(prevState => {
            return {...prevState!, items}
        });   
    }

    return (
    <StoreContext.Provider value = {{basket,setBasket,removeItem}}>
        {children}
    </StoreContext.Provider>);
    
}