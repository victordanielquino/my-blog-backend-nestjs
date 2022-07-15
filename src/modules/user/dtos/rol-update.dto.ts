import { PartialType } from "@nestjs/swagger";
import { RolCreateDto } from "./rol-create.dto";

export class RolUpdateDto extends PartialType(RolCreateDto) {};