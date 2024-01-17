"use server";

import { cookies } from "next/headers";

export const setToken = async (token: string) => {
  cookies().set(`auth_token`, token);
};

export const deleteToken = async () => {
  cookies().delete(`auth_token`);
};
