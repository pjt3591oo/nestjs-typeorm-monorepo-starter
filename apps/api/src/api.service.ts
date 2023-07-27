import { CommonException } from '@app/config';
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
    if (new Date().getTime() % 2) {
      throw new CommonException('API', 'READ', '데이터 조회 중 문제발생');
    }

    await this.userRepository.insert({
      name: new Date().getTime().toString(),
      age: 1,
    });
    return await this.userRepository.find();
  }
}
