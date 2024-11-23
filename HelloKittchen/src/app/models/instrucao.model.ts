import { Receita } from "./receita.model";

export interface Instrucao{
  recipe: Receita;
  step: string;
  id: number
  dateCreated: string;  //em $date-time
  lastUpdated: string; //em $date-time
}

