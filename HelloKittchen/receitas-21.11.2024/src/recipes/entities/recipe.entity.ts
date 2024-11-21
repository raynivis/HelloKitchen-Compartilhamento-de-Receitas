import { BaseEntity } from '@shared/entities/base.entity';
import { User } from 'src/auth/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { Instruction } from './instruction.entity';
import { Rating } from './rating.entity';
import { Image } from './image.entity';

@Entity()
@Unique(['name', 'user'])
export class Recipe extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Category, { eager: true, nullable: false })
  category: Category;

  @Column({ type: 'int' })
  preparationTime: number;

  @Column({ type: 'float' })
  portion: number;

  @Column({ type: 'float' })
  calories: number;

  @Column({ nullable: true, type: 'datetime' })
  published_at: Date;

  @ManyToOne(() => User, { eager: true, nullable: false })
  user: User;

  @Column({ type: 'float', nullable: true })
  score: number;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
    eager: true,
  })
  ingredients: Ingredient[];

  @OneToMany(() => Instruction, (instruction) => instruction.recipe, {
    eager: true,
  })
  instructions: Instruction[];

  @OneToMany(() => Rating, (rating) => rating.recipe, { eager: true })
  ratings: Rating[];

  @OneToMany(() => Image, (image) => image.recipe, { eager: true })
  images: Image[];
}
