import { Controller, Post, Get, UseGuards, Body } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UserDecorator } from "../../common/decorators";
import { User } from "../../modules/user/entities";
import { LocalAuthGuard } from "./guards";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dtos";


@ApiTags('Controller: Auth')
@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginDto, @UserDecorator() user: User) {
    return {
      message: 'login exitoso',
      data: this._authService.login(user)
    }
  }


  @Get('profile')
  profile(@UserDecorator() user: User) {
    return {
      message: 'profile',
      user
    }
  }

  @Get('refresh')
  refreshLogin(@UserDecorator() user: User ) {
    const data = this._authService.login(user);
    return {
      message: 'refresh login exit',
      data,
    }
  }
}
