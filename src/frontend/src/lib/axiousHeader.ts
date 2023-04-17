import { Cookies } from "react-cookie";
import { httpHeaders } from "../types/Http";
import { hasAuthToken } from "./checkCookies";

const cookies = new Cookies();

export function setAuthorizationHeader(): httpHeaders {
  if (!hasAuthToken()) {
    throw new Error("Authorization token does not exist");
  }
  return {
    headers: {
      Authorization: `Bearer ${cookies.get("authToken")}`,
    },
  };
}
