import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { Controller, FieldErrors, FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
type InputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<
  TFieldValues,
  TName
> &
  Omit<TextFieldProps, "name" | "defaultValue"> & {
    errors: FieldErrors;
    possibleVisible?: boolean;
  };

/**
 * @param control Estado de controle fornecido pelo hook `useForm`
 * @param name Nome do campo do formulário, usado para registrar o campo
 * @param label Rótulo a se exibido no input
 * @param errors Erros fornecios pelo hook `useForm` (`formState.errors`), o campo que causou o erro será rotulado e marcado em vermelho
 * @param showPassword Dirá se a senha pode ou não ser exibida (default: true)
  @description Este componente envelopa um TextField do Material UI com um Controller do react-hook-form
*/
const RHFPasswordInputField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  errors,
  defaultValue,
  possibleVisible = true,
  ...props
}: InputProps<TFieldValues, TName>) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={props.rules}
      render={({ field }) => (
        <TextField
          fullWidth
          label={label}
          variant="outlined"
          error={!!errors[name]}
          helperText={!!errors[name] ? `${errors[name]!.message}` : undefined}
          type={isVisible ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: possibleVisible && (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={() => setIsVisible((prev) => !prev)}>
                    {isVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          {...field}
          {...props}
        />
      )}
    />
  );
};

export default RHFPasswordInputField;
