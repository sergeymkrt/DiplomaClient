export interface ResponseModel<T> {
  data: T;
  message: string;
  success: boolean;
}
