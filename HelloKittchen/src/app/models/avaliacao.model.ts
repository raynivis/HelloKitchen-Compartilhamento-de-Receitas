import { Receita } from "./receita.model";
import { Usuario } from "./usuario.model";

export interface Avaliacao{
    recipe: Receita;
    user: Usuario;
    rating: number;
    comment: string;
    id: number;
    dateCreated: string;  //em $date-time
    lastUpdated: string; //em $date-time
}

