import { TextField, TextFieldProps } from "@mui/material";
import {
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
  UseControllerProps,
  UseFormClearErrors,
  UseFormSetValue,
} from "react-hook-form";
import { NumericFormat } from "react-number-format";

type InputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<
  TFieldValues,
  TName
> &
  Omit<TextFieldProps, "name" | "defaultValue"> & {
    errors: FieldErrors;
    decimalScale?: number;
    fixedDecimalScale?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    setValue: UseFormSetValue<TFieldValues>;
    clearErrors: UseFormClearErrors<TFieldValues>;
  };

/**
 * @param control Estado de controle fornecido pelo hook `useForm`
 * @param name Nome do campo do formulário, usado para registrar o campo
 * @param label Rótulo a se exibido no input
 * @param errors Erros fornecios pelo hook `useForm` (`formState.errors`), o campo que causou o erro será rotulado e marcado em vermelho
  @description Este componente envelopa um TextField do Material UI com um Controller do react-hook-form
*/
const RHFNumericInputField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  errors,
  defaultValue,
  clearErrors,
  setValue,
  decimalScale,
  fixedDecimalScale,
  disabled,
  ...props
}: InputProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={props.rules}
      render={({ field }) => (
        <NumericFormat
          thousandSeparator={"."}
          decimalSeparator={","}
          decimalScale={decimalScale || 2}
          fixedDecimalScale={fixedDecimalScale || true}
          disabled={disabled}
          customInput={TextField}
          fullWidth
          label={label}
          {...field}
          error={!!errors[name]}
          helperText={!!errors[name] ? `${errors[name]!.message}` : undefined}
          onValueChange={(values) => {
            setValue(name, values.value as any);
            if (errors[name]) clearErrors(name);
          }}
        />
      )}
    />
  );
};

export default RHFNumericInputField;
