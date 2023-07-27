import { User } from '@app/database/entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ApiService {
  constructor(
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
    @Inject(User) private readonly userRepository: Repository<User>,
  ) {}

  async getHello(): Promise<User[]> {
    await this.userRepository.insert({
      name: new Date().getTime().toString(),
      age: 1,
    });
    return await this.userRepository.find();
  }
}
