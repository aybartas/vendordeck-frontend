import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";
import AppCheckBox from "../../components/form/AppCheckBox";
import AppTextInput from "../../components/form/AppTextInput";

export default function AddressForm() {
  const { control } = useFormContext();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AppTextInput
            control={control}
            name="shippingAddress.fullName"
            label="Full name"
          />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput
            control={control}
            name="shippingAddress.address1"
            label="Address 1"
          />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput
            control={control}
            name="shippingAddress.address2"
            label="Address 2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            name="shippingAddress.city"
            label="City"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            name="shippingAddress.state"
            label="State"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            name="shippingAddress.zip"
            label="Zip/Postal Code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            name="shippingAddress.country"
            label="Country"
          />
        </Grid>
        <Grid item xs={12}>
          <AppCheckBox
            name="saveAddress"
            label="Save this address for upcoming orders"
            control={control}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
