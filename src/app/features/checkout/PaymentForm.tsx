import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Controller, useFormContext } from "react-hook-form";
import AppTextInput from "../../components/form/AppTextInput";
import { AppStripeInput } from "../../components/form/AppStripeInput";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { StripeElementType } from "@stripe/stripe-js";
import { TextField } from "@mui/material";

interface Props {
  cardState: {
    elementError: { [key in StripeElementType]?: string };
  };
  onCardInputChange: (event: any) => void;
}
export default function PaymentForm(props: Props) {
  const { control } = useFormContext();
  const { cardState, onCardInputChange } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Controller
            name="payment.nameOnCard"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="Name on card"
                error={!!error}
                variant="outlined"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="payment.cardNumber"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="Card number"
                error={!!cardState.elementError.cardNumber}
                helperText={cardState.elementError.cardNumber}
                variant="outlined"
                InputProps={{
                  inputComponent: AppStripeInput,
                  inputProps: {
                    component: CardNumberElement,
                  },
                }}
                InputLabelProps={{ shrink: true }}
                onChange={onCardInputChange}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="payment.expDate"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="Expiry date"
                error={!!cardState.elementError.cardExpiry}
                helperText={cardState.elementError.cardExpiry}
                variant="outlined"
                InputProps={{
                  inputComponent: AppStripeInput,
                  inputProps: {
                    component: CardExpiryElement,
                  },
                }}
                InputLabelProps={{ shrink: true }}
                onChange={onCardInputChange}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="payment.cvv"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="CVV"
                error={!!cardState.elementError.cardCvc}
                helperText={cardState.elementError.cardCvc}
                variant="outlined"
                InputProps={{
                  inputComponent: AppStripeInput,
                  inputProps: {
                    component: CardCvcElement,
                  },
                }}
                InputLabelProps={{ shrink: true }}
                onChange={onCardInputChange}
              />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
