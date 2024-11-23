import { Avaliacao } from './avaliacao.model';
import { Categoria } from './categoria.model';
import { ImagemReceita } from './imagemReceita.model';
import { Ingrediente } from './ingrediente.model';
import { Instrucao } from './instrucao.model';
import { Usuario } from './usuario.model';
export interface Receita{
  name: string;
  description: string;
  category: Categoria;
  preparationTime: number;
  portion: number;
  calories: number;
  published_at: string //em ($date-time)
  user: Usuario;
  score: number;
  ingredients:	Ingrediente[];
  instructions: Instrucao[];
  ratings: Avaliacao[];
  images: ImagemReceita[];
  id: number;
  dateCreated: string;  //em $date-time
  lastUpdated: string; //em $date-time
}

