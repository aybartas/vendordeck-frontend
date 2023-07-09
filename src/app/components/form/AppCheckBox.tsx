import { Checkbox, FormControlLabel } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
  label: string;
}
export default function AppCheckBox(props: Props) {
  const { field } = useController({
    ...props,
    defaultValue: false,
  });

  return (
    <FormControlLabel
      {...props}
      control={
        <Checkbox color="secondary" checked={field.value} {...field}></Checkbox>
      }
      label={props.label}
    />
  );
}
