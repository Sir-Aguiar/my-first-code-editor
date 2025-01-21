"use client";

import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import RHFInputField from "@/components/RHFInputs/RHFInputField/RHFInputField";
import { CreateUserSchema, ICreateUserDTO } from "@/dtos/user";
import { createUser, getUsers } from "@/services/user-service";
import { useEffect } from "react";

export default function Page() {
  const { control, formState, handleSubmit } = useForm<ICreateUserDTO>({
    resolver: yupResolver(CreateUserSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      name: "",
      username: "",
    },
  });

  const onSubmit = async ({ email, name, password, username }: ICreateUserDTO) => {
    try {
      const response = await createUser({ email, name, password, username });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
      <RHFInputField control={control} name="email" errors={formState.errors} label="Email" />
      <div className={styles.form_row}>
        <RHFInputField control={control} name="password" errors={formState.errors} label="Senha" type="password" />
        <RHFInputField
          control={control}
          name="passwordConfirmation"
          errors={formState.errors}
          label="Confirme a senha"
          type="password"
        />
      </div>
      <div className={styles.form_row}>
        <RHFInputField control={control} name="name" errors={formState.errors} label="Nome" />
        <RHFInputField
          control={control}
          name="username"
          errors={formState.errors}
          label="Nome de Usuário"
          sx={{ maxWidth: "204px" }}
        />
      </div>
      <Button variant="contained" type="submit" fullWidth>
        Cadastrar
      </Button>
    </form>
  );
}
