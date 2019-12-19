import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class LoginService {
  constructor(
    private Users: { username: string; password: string }[] = [],
    private readonly configService: ConfigService,
  ) {
    this.pushUser();
  }

  private pushUser(): void {
    const username = this.configService.get<string>('DUMMY_USER');
    const password = this.configService.get<string>('DUMMY_PASSWORD');

    this.Users.push({ username, password });
  }

  public findUser(user: LoginDto): boolean {
    return this.Users.includes(user);
  }
}
