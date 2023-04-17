import { Cookies } from "react-cookie";

const cookies = new Cookies();

export function hasAuthToken(): boolean {
  if (cookies.get("authToken")) {
    return true;
  }
  return false;
}

export function hasProfileToken(): boolean {
  if (cookies.get("userProfile")) {
    return true;
  }
  return false;
}
