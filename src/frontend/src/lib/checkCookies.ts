import { useCookies } from "react-cookie";

export function hasAuthToken(): boolean {
  const [cookies] = useCookies();
  if (cookies.authToken) {
    return true;
  }
  return false;
}

export function hasProfileToken(): boolean {
  const [cookies] = useCookies();
  if (cookies.userProfile) {
    return true;
  }
  return false;
}
