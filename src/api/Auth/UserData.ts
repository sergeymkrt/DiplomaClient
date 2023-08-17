import { del, get } from '@/utils/httpClient';
import { User } from '@/store/user/types';
import { AxiosResponse } from 'axios';

export async function GetUserData(): Promise<AxiosResponse<User, unknown>> {
  return get<User>('/Authentication/getUser');
}

export async function IsUserLoggedIn(): Promise<AxiosResponse<unknown, unknown>> {
  return get<unknown>('/Authentication/isAuthenticated');
}

export async function Logout(): Promise<AxiosResponse<boolean, unknown>> {
  return del<boolean>('/Authentication/Logout');
}
