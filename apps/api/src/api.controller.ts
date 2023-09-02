import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import { User } from '@app/database/entities/user.entity';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  getHello(): Promise<User[]> {
    return this.apiService.getHello();
  }

  @Get()
  health() {
    return 'pong';
  }
}
