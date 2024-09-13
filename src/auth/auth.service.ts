import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string, expires_in: number, refresh_token: string }> {
    const user = await this.usersService.findByUsername(username);
    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };

    // Generate access token
    const access_token = this.jwtService.sign(payload);

    // Generate refresh token
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' }); // Refresh token valid for 7 days

    // Access token expiration time (in seconds)
    const expires_in = 3600;

    return {
      access_token,
      expires_in,
      refresh_token,
    };
  }
}
