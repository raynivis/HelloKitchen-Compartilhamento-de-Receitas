import { BaseEntity } from '@shared/entities/base.entity';
import { User } from 'src/auth/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { BookRecipe } from './book-recipe.entity';

@Entity()
@Unique(['name', 'user'])
export class Book extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @OneToMany(() => BookRecipe, (bookRecipe) => bookRecipe.book, { eager: true })
  recipes: BookRecipe[];
}
