import { RoleEnum } from "../../../role/RoleEnum";

export class UserResponse {
  id: string;

  firstName: string;

  lastName: string;

  username: string; // email

  password: string;

  role: RoleEnum;
}
