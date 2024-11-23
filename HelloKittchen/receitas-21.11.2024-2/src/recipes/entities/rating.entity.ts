import { BaseEntity } from '@shared/entities/base.entity';
import { User } from 'src/auth/users/entities/user.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
@Unique(['recipe', 'user'])
export class Rating extends BaseEntity {
  @ManyToOne(() => Recipe)
  recipe: Recipe;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;
}
