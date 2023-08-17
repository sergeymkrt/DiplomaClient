import * as z from 'zod';
import { loginFormSchema } from '@/sections/forms/LoginForm';
import { post } from '@/utils/httpClient';
import { User } from '@/store/user/types';

export async function LoginUser(userData: z.infer<typeof loginFormSchema>) {
  return post<boolean>(`/Authentication/login`, userData);
}

export async function RegisterUser(userData: User) {
  return post<boolean>(`/Authentication/register`, userData);
}
