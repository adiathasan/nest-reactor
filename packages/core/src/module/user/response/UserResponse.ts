import { RoleEnum } from "../../../role/RoleEnum";

export interface UserResponse {
  id: string;

  firstName: string;

  lastName: string;

  username: string; // email

  password: string;

  role: RoleEnum;
}
