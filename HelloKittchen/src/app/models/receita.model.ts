import { Ingredient } from '../../../receitas-21.11.2024-2/src/recipes/entities/ingredient.entity';
import { Usuario } from './usuario.model';
export interface Receita{
  name: string;
  description: string;
  //category*	Category{...}
  preparationTime: number;
  portion: number;
  calories: number;
  published_at: string //em ($date-time)
  user: Usuario;
  score: number;
  ingredients:	Ingredient[];
  /*
  instructions*	[Instruction{...}]
  ratings*	[Rating{...}]
  images*	[Image{...}]
  */
  id: number;
  dateCreated: string;  //em $date-time
  lastUpdated: string; //em $date-time
}

