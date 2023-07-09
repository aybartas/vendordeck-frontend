import { TextField } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
  label: string;
  helperText?: string;
}
export default function AppTextInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });

  const helper = fieldState.error?.message
    ? fieldState.error?.message
    : props.helperText;

  return (
    <TextField
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      {...props}
      {...field}
      helperText={helper}
    ></TextField>
  );
}
