import { Injectable } from "@nestjs/common";
import { UserService } from "../../modules/user/services/user.service";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from 'bcrypt';
import { User } from "../../modules/user/entities";
import { PayloadTokenDto } from "./dtos";
import { RoleEnum } from "../../shared/enums";

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
      if (isMath) {
        return user;
      }
    }
    return null;
  }

  login(user: User){
    const payloadToken: PayloadTokenDto = {
      id: user.id,
      username: user.username,
      roles: user.roles.map(r => r.name as RoleEnum)
    };
    return {
      access_token: this._jwtService.sign(payloadToken),
      user,
    }
  }
}
