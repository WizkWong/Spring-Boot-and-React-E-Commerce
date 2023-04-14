import { useCookies } from "react-cookie";
import { httpHeaders } from "../types/Http";

export function setAuthorizationHeader(): httpHeaders | undefined {
  const [cookies] = useCookies();
  if (!cookies.authToken) {
    return undefined;
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