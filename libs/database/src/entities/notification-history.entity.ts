import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateEntity } from '../common/base.entity';
import { User } from './user.entity';

@Entity()
export class NotificationHistory extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '알림 제목' })
  title: string;

  @Column({ comment: '알림 부가내용' })
  description: string;

  @Column({ comment: '성공, 실패에 따른 알림 여부' })
  status: boolean;

  @Column({ comment: '알림 확인 여부' })
  isView: boolean;

  @ManyToOne(() => User, (user) => user.notificationHistories)
  user: User;
}
