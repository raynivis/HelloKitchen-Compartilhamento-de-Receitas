import { Receita } from "./receita.model";

export interface ImagemReceita{
  id: number;
  recipe: Receita;
  fileName: string;
  contentLength: number;
  contentType: string;
  url: string;
}
