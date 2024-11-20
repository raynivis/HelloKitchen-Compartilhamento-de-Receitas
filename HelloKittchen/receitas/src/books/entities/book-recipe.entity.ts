import { BaseEntity } from '@shared/entities/base.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { Book } from './book.entity';
import { Recipe } from 'src/recipes/entities/recipe.entity';

@Entity()
@Unique(['book', 'recipe'])
export class BookRecipe extends BaseEntity {
  @ManyToOne(() => Book)
  book: Book;

  @ManyToOne(() => Recipe, { eager: true })
  recipe: Recipe;

  @Column({ type: 'text', nullable: true })
  notes: string;
}
