import { del, get } from '@/utils/httpClient';
import { User } from '@/store/user/types';
import { AxiosResponse } from 'axios';

export async function GetUserData(): Promise<AxiosResponse<User, unknown>> {
  return get<User>('/Authentication/GetUserData');
}

export async function IsUserLoggedIn(): Promise<AxiosResponse<boolean, unknown>> {
  return get<boolean>('/Authentication/IsUserLoggedIn');
}

export async function Logout(): Promise<AxiosResponse<boolean, unknown>> {
  return del<boolean>('/Authentication/Logout');
}
