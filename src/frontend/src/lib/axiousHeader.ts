import { Cookies } from "react-cookie";
import { HttpHeaders } from "../types/Http";
import { hasAuthToken } from "./checkCookies";

const cookies = new Cookies();

export function setAuthorizationHeader(): HttpHeaders {
  if (!hasAuthToken()) {
    throw new Error("Authorization token does not exist");
  }
  return {
    headers: {
      Authorization: `Bearer ${cookies.get("authToken")}`,
    },
  };
}
