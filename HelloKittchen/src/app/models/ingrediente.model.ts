import { Receita } from './receita.model';
export interface Ingrediente{
  recipe: Receita;
  name: string;
  amount: number;
  type: string;
  id: number;
  dateCreated: string;  //em $date-time
  lastUpdated: string; //em $date-time
}

