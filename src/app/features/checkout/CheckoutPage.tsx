import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./CheckOutValidation";
import { apiAgent } from "../../api/ApiService";
import { toast } from "react-toastify";
import { emptyBasket } from "../basket/basketSlice";
import { useAppSelector } from "../../store/configureStore";
import { StripeCardNumberElement, StripeElementType } from "@stripe/stripe-js";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        VendorDeck
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const steps = ["Shipping address", "Payment details", "Review your order"];

export default function CheckOutPage() {
  const { user } = useAppSelector((state) => state.account);
  const savedAddress = user?.lastAddress;
  const formOptions = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      shippingAddress: savedAddress,
    },
  });
  const { handleSubmit, formState, reset, watch } = formOptions;
  const formData = watch();

  const [cardState, setCardState] = React.useState<{
    elementError: { [key in StripeElementType]?: string };
  }>({ elementError: {} });

  const [cardComplete, setCardComplete] = React.useState<any>({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });

  function onCardInputChange(event: any) {
    setCardState({
      ...cardState,
      elementError: {
        ...cardState.elementError,
        [event.elementType]: event?.error?.message,
      },
    });

    setCardComplete({ ...cardComplete, [event.elementType]: event.complete });
  }
  const { isValid } = formState;
  const [activeStep, setActiveStep] = React.useState(0);
  const [orderNumber, setOrderNumber] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [paymentMessage, setPaymentMessage] = React.useState("");
  const [paymentSucceded, setPaymentSucceded] = React.useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { basket } = useAppSelector((state) => state.basket);

  async function submitOrder(data: FieldValues) {
    setLoading(true);

    const { nameOnCard } = formData.payment;

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardNumberElement);
    const paymentResult = await stripe.confirmCardPayment(
      basket?.clientSecret!,
      {
        payment_method: {
          card: cardElement!,
          billing_details: {
            name: nameOnCard,
          },
        },
      }
    );

    if (paymentResult.paymentIntent?.status === "succeeded") {
      apiAgent.Order.createOrder(data).then((res) => {
        setOrderNumber(res.orderNumber);
        setActiveStep(activeStep + 1);
        setPaymentSucceded(true);
        setPaymentMessage("Thank you - we have received your payment");
        setLoading(false);
        emptyBasket();
      });
    } else {
      setPaymentMessage(paymentResult.error?.message!);
      setActiveStep(activeStep + 1);
      setPaymentSucceded(false);
    }

    setLoading(false);
  }

  const handleNext = async (data: FieldValues) => {
    if (activeStep === 2) {
      await submitOrder(data);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  function isSubmitDisabled() {
    const isPayment = activeStep === steps.length - 1;
    if (isPayment)
      return (
        !cardComplete.cardCvc ||
        !cardComplete.cardExpiry ||
        !cardComplete.cardNumber ||
        !isValid
      );
    else {
      return !isValid;
    }
  }
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const stepContent = React.useMemo(() => {
    switch (activeStep) {
      case 0:
        return <AddressForm />;
      case 1:
        return (
          <PaymentForm
            cardState={cardState}
            onCardInputChange={onCardInputChange}
          />
        );
      case 2:
        return <Review />;
      default:
        <></>;
    }
  }, [activeStep]);

  return (
    <FormProvider {...formOptions}>
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                {paymentMessage}
              </Typography>

              {paymentSucceded ? (
                <Typography variant="subtitle1">
                  Your order number is #{orderNumber}. We have emailed your
                  order confirmation and will send you an update when your order
                  has shipped.
                </Typography>
              ) : (
                <Button variant="contained" onClick={handleBack}>
                  Go back and try again
                </Button>
              )}
            </React.Fragment>
          ) : (
            <form onSubmit={handleSubmit(handleNext)}>
              {stepContent}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  disabled={isSubmitDisabled()}
                  variant="contained"
                  type="submit"
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </form>
          )}
        </Paper>
        <Copyright />
      </Container>
    </FormProvider>
  );
}
