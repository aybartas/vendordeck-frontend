import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../components/form/AppTextInput";
import AppCheckBox from "../../components/form/AppCheckBox";

export default function PaymentForm() {
  const { control } = useFormContext();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AppTextInput
            control={control}
            name="payment.nameOnCard"
            label="Name on card"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput
            control={control}
            name="payment.cardNumber"
            label="Card number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput
            control={control}
            name="payment.expDate"
            label="Expiry date"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput
            label="CVV"
            helperText="Last three digits on signature strip"
            name="payment.cvv"
          />
        </Grid>
        <Grid item xs={12}>
          <AppCheckBox
            control={control}
            name="payment.savePayment"
            label="Remember credit card details for next time"
          ></AppCheckBox>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
