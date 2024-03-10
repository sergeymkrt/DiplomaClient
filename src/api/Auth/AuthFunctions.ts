import * as z from 'zod';
import { loginFormSchema } from '@/sections/forms/LoginForm';
import { get, post } from '@/utils/httpClient';
import { User } from '@/store/user/types';

export async function LoginUser(userData: z.infer<typeof loginFormSchema>) {
  return post<boolean>(`/Authentication/login`, userData);
}

export async function RegisterUser(userData: User) {
  return post<boolean>(`/Authentication/register`, userData);
}

export async function LogoutUser() {
  return post<boolean>(`/Authentication/logout`);
}

export async function GetUser() {
  return post<User>(`/Authentication/getUser`);
}

export async function GeneratePassword() {
  return get<string>(`/Authentication/GenerateStrongPassword`);
}
