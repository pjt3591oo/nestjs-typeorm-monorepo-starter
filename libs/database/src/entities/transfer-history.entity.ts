import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateEntity } from '../common/base.entity';
import { User } from './user.entity';

@Entity()
export class TransferHistory extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '이체금액' })
  amount: number;

  @Column({ comment: '이체결과' })
  status: boolean;

  @ManyToOne(() => User, (user) => user.transferHistories)
  user: User;
}
