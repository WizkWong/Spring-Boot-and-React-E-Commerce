import { Cookies } from "react-cookie";

const cookies = new Cookies();

export function hasAuthToken(): boolean {
  if (cookies.get("authToken")) {
    return true;
  }
  return false;
}
