import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateEntity } from '../common/base.entity';
import { NotificationHistory } from './notification-history.entity';
import { TransferHistory } from './transfer-history.entity';

@Entity()
export class User extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @OneToMany(
    () => NotificationHistory,
    (notificationHistory) => notificationHistory.user,
  )
  notificationHistories: NotificationHistory[];

  @OneToMany(() => TransferHistory, (transferHistory) => transferHistory.user)
  transferHistories: TransferHistory[];
}
