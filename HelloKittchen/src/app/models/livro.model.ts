import { LivroReceita } from "./livroReceita.model";
import { Usuario } from "./usuario.model";

export interface Livro{
  name: string;
  user: Usuario;
  recipes: LivroReceita[];
  id: number;
  dateCreated: string //em $date-time
  lastUpdated:  string //em $date-time
}
