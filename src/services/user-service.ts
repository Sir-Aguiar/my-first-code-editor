"use server";

import { ICreateUserDTO } from "@/dtos/user";
import prisma from "../../lib/prisma";

export const getUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export const createUser = async (data: ICreateUserDTO) => {
  const user = await prisma.user.create({ data });
};
