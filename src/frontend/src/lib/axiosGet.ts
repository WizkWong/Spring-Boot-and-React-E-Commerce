import axios from "axios";
import { setAuthorization } from "./axiousAuth";


export function getFetch<T = any>({ url }: { url: string }): T | undefined {
  axios.get(url, setAuthorization())
  .then((response) => {
    try {
      return response.data;
    } catch (err) {
      console.log(err)
    }
  })
  .catch((error) => {
      console.log(error)
  });
  return undefined;
}
