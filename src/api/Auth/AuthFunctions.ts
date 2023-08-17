import * as z from 'zod';
import { loginFormSchema } from '@/sections/forms/LoginForm';
import { post } from '@/utils/httpClient';

export async function LoginUser(userData: z.infer<typeof loginFormSchema>) {
  return post<boolean>(`/Authentication/Login`, userData);
}
