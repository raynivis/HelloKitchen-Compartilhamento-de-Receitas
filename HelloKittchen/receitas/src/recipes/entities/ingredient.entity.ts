import { BaseEntity } from '@shared/entities/base.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
@Unique(['recipe', 'name'])
export class Ingredient extends BaseEntity {
  @ManyToOne(() => Recipe, { nullable: false })
  recipe: Recipe;

  @Column()
  name: string;

  @Column({ type: 'float' })
  amount: number;

  @Column()
  type: string;
}
