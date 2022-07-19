import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ACGuard, Role, UseRoles } from "nest-access-control";

import { JwtAuthGuard } from "../guards";

export const AuthDecorator = (...roles: Role[]) => {
  return applyDecorators(
    UseGuards(JwtAuthGuard, ACGuard),
    UseRoles(...roles),
    ApiBearerAuth()
  )
}