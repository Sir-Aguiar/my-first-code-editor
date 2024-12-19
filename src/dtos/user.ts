import * as yup from "yup";

export const CreateUserSchema = yup.object({}).shape({
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  username: yup.string().required("Nome de usuário obrigatório"),
  name: yup.string().required("Nome obrigatório"),
  password: yup.string().required("Senha obrigatória"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem ser iguais")
    .required("Confirmação de senha obrigatória"),
});

export interface ICreateUserDTO extends yup.InferType<typeof CreateUserSchema> {}
