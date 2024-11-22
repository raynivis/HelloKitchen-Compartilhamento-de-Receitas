import { Livro } from "./livro.model";

export interface LivroReceita{
  book: Livro;
  /*recipe*	Recipe{...}*/
  notes: string;
  id: number;
  dateCreated: string;  //em $date-time
  lastUpdated: string; //em $date-time
}

