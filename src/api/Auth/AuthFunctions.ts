import * as z from 'zod';
import { loginFormSchema } from '@/sections/forms/LoginForm';
import { get, patch, post } from '@/utils/httpClient';
import { User } from '@/store/user/types';
import QueryStringBuilder from '@/utils/QueryStringBuilder';

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

export async function VerifyEmailPost(email: string, token: string) {
  const query = QueryStringBuilder({ email, token });
  return patch<boolean>(`/Authentication/verifyEmail?${query}`);
}
