import { useCookies } from "react-cookie";
import { httpHeaders } from "../types/Http";

export function setAuthorizationHeader(): httpHeaders {
  const [cookies] = useCookies();
  if (!cookies.authToken) {
    throw new Error("Authorization token does not exist");
  }
  return {
    headers: {
      Authorization: `Bearer ${cookies.authToken}`,
    },
  };
}

export function hasAuthToken(): boolean {
  const [cookies] = useCookies();
  if (cookies.authToken) {
    return true;
  }
  return false;
}