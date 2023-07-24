import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "../../../commons/utils";

export class UpdateUserDto extends PartialType(CreateUserDto) {}
