import { Injectable } from '@nestjs/common';
import { UserService } from "../../modules/user/services/user.service";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from 'bcrypt';
import { User } from "../../modules/user/entities";
import { PayloadTokenDto } from "./dtos";

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService
  ) {}

  // METODO DE VALIDACION:
  async validateUser(username: string, password: string) {
    const user = await this._userService.getOneWithUsername(username);
    if (user && user.password) {
      const isMath = await bcrypt.compare(password, user.password);
      if (isMath) return user;
    }
    return null;
  }

  login(user: User){
    const payloadToken: PayloadTokenDto = {rol: user.rol.description, sub: user.id};
    return {
      access_token: this._jwtService.sign(payloadToken),
      user,
    }
  }
}
