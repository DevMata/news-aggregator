import { Controller, Post, Body, UsePipes, BadRequestException } from '@nestjs/common';
import { ValidateLoginPayloadPipe } from './pipes/validate-login-payload.pipe';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @UsePipes(ValidateLoginPayloadPipe)
  async validateLogin(@Body() login: LoginDto): Promise<string> {
    if (this.loginService.findUser(login)) {
      return '';
    } else {
      throw new BadRequestException('user not found');
    }
  }
}
