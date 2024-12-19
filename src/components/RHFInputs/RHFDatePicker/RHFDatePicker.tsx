import { TextFieldProps } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { PickerValidDate } from "@mui/x-date-pickers/models";
import dayjs from "dayjs";
import React from "react";
import { Controller, FieldErrors, FieldPath, FieldValues, UseControllerProps } from "react-hook-form";

type InputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<
  TFieldValues,
  TName
> &
  Omit<TextFieldProps, "name" | "defaultValue"> & {
    errors: FieldErrors;
  };

/**
 * @param control Estado de controle fornecido pelo hook `useForm`
 * @param name Nome do campo do formulário, usado para registrar o campo
 * @param label Rótulo a se exibido no input
 * @param errors Erros fornecios pelo hook `useForm` (`formState.errors`), o campo que causou o erro será rotulado e marcado em vermelho
  @description Este componente envelopa um DatePicker do Material UI com um Controller do react-hook-form
*/
const RHFDatePicker = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  errors,
  defaultValue,
  ...props
}: InputProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={props.rules}
      render={({ field }) => (
        <DatePicker
          {...field}
          value={field.value ? dayjs(field.value) : null}
          label={label}
          inputRef={field.ref}
          slotProps={{
            textField: {
              fullWidth: true,
              ...props,
              error: !!errors[name],
              helperText: !!errors[name] ? `${errors[name]!.message}` : undefined,
            },
          }}
        />
      )}
    />
  );
};

export default RHFDatePicker;
