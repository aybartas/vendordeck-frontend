import { TextField } from "@mui/material";
import { Controller, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps {
  label: string;
  helperText?: string;
  rest?: Record<string, any>;
}
export default function AppTextInput(props: Props) {
  const { label, helperText, rest } = props;

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          fullWidth
          label={label}
          error={!!error}
          variant="outlined"
          helperText={error ? error.message : helperText}
          {...field}
          {...rest}
          onChange={(e) =>  e.target.value}
        />
      )}
    />
  );
}
