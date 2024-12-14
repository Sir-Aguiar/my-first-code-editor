"use client";

import { UserRepository } from "@/repositories/user-repository";
import { User } from "@prisma/client";
import { use, useEffect, useState } from "react";

export default function Page() {
  const userRepository = new UserRepository();

  const [USERS, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userRepository.getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <div>
      {USERS.map((user) => (
        <div key={user.userId}>{user.name}</div>
      ))}
    </div>
  );
}
