import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guards";
import { ApiBearerAuth } from "@nestjs/swagger";

export const AuthDecorator = () => {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth()
  )
}