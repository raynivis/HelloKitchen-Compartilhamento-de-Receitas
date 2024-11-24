import { BaseEntity } from '@shared/entities/base.entity';
import { User } from 'src/auth/users/entities/user.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
@Unique(['recipe', 'step'])
export class Instruction extends BaseEntity {
  @ManyToOne(() => Recipe, { nullable: false })
  recipe: Recipe;

  @Column({ type: 'text' })
  step: string;
}
