import { User } from "../../models/entities/user";

export interface AccountState {
  user: User | null;
  userLoading: boolean;
  token: string;
}
