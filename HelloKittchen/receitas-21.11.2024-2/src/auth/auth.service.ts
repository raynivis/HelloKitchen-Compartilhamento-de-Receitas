/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { UserPayload } from './models/user-payload.model';
import { UserToken } from './models/user-token.model';
import { User } from './users/entities/user.entity';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
    };
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findByEmail(email, true);

    if (user) {
      const isPasswordValid = await compareSync(pass, user.password);
      if (isPasswordValid) {
        const { password, ...result } = user;
        return result as User;
      }
    }

    return null;
  }
}