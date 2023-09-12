import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps {
  label: string;
  helperText?: string;
}
export default function AppCheckBox(props: Props) {
  const { name, label, helperText, control } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field, fieldState: { error } }) => (
        <FormControlLabel
          {...field}
          control={
            <Checkbox
              color="secondary"
              checked={field.value}
              {...field}
            ></Checkbox>
          }
          label={label}
        />
      )}
    />
  );
}
