import axios, { AxiosResponse } from "axios";
import { setAuthorizationHeader } from "../lib/axiousHeader";

abstract class UserService {
  
  changePassword(oldPassword: string, newPassword: string): Promise<AxiosResponse<any, any>> {
    return axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/user/change-password`,
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      setAuthorizationHeader()
    );
  }
}

export default UserService;
