"use server";

import { PrismaClient } from "@prisma/client";
import { ICreateUserDTO } from "@/dtos/user";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const createUser = async (data: Omit<ICreateUserDTO, "passwordConfirmation">) => {
  try {
    const user = await prisma.user.create({ data });
    return { ...user, password: undefined } as any;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const field = (error.meta?.target as string[]).join(", ");

        if (field.includes("email")) {
          throw new Error("Este email já está em uso");
        }

        if (field.includes("username")) {
          throw new Error("Este nome de usuário já está em uso");
        }
      }
    }

    throw error;
  }
};
