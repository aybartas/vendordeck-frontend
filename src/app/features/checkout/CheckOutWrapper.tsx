import { Elements } from "@stripe/react-stripe-js";
import CheckOutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../store/configureStore";
import { useEffect, useState } from "react";
import { apiAgent } from "../../api/ApiService";
import { setBasket } from "../basket/basketSlice";
import Loading from "../../layout/Loading";

const stripePromise = loadStripe(
  "pk_test_51NqZTbFBkjy6NTrg9sTjxAssIcFohe9SEM4zGDRj3Fo07pnYBbQ63GoIGk1iSLxMeOSS6VckTSKwQT4t65uvbFIK00oUTQRPP5"
);
export default function CheckoutWrapper() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiAgent.Payments.createPaymentIntent()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <Loading message="Loading checkout..."></Loading>;
  return (
    <Elements stripe={stripePromise}>
      <CheckOutPage />
    </Elements>
  );
}
