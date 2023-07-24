import { PaginatedResponse, Pagination } from "../../commons/pagination";
import { createRouter } from "../../lib/composables";
import { UserResponse } from "./response/UserResponse";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RoleEnum } from "../../role/RoleEnum";

class UserQuery extends Pagination {
  role?: RoleEnum;
}

export const userRouter = createRouter({
  list: {
    method: "GET",
    dto: UserQuery,
    returnedSchema: PaginatedResponse<UserResponse>,
  },
  get: {
    method: "GET",
    returnedSchema: UserResponse,
  },
  create: {
    method: "POST",
    dto: CreateUserDto,
    returnedSchema: UserResponse,
  },
  update: {
    method: "PUT",
    dto: UpdateUserDto,
    returnedSchema: UserResponse,
  },
});
