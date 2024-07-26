type BaseResponse<T = any> = {
  success: boolean;
  message: string;
  data: T | null;
};
