import request from "@/api/request";

export interface LoginResponse {
  token: string;
  userInfo: {
    username: string;
    // 其他用户信息字段
  };
}

export const login = (data: { username: string; password: string }) => {
  return request.post<LoginResponse>("/login", data);
};
