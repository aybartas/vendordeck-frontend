import { Address } from "./address";

export interface User {
  email: string;
  token: string;
  lastAddress: Address;
}
