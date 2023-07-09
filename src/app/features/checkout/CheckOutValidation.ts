import * as yup from "yup";

export const validationSchema = yup.object({
  shippingAddress: yup.object({
    fullName: yup.string().required("Full name is required"),
    address1: yup.string().required("Address 1  is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zip: yup.string().required("Zip is required"),
  }),
  payment: yup.object({
    nameOnCard: yup.string().required("Name on card is required"),
  }),
});
