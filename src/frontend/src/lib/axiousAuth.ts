import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function setAuthorization(): { headers: { Authorization: string } } {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  if (!cookies.authToken) {
    navigate("/login");
  }
  return {
    headers: {
      Authorization: `Bearer ${cookies.authToken}`,
    },
  };
}

export function checkAuthToken(): boolean {
  const [cookies] = useCookies();
  if (cookies.authToken) {
    return true;
  }
  return false;
}
