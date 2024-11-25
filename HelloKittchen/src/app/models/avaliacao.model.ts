import { Receita } from "./receita.model";
import { Usuario } from "./usuario.model";

export interface Avaliacao{
    recipe: string;
    user: Usuario;
    rating: number;
    comment: string;
    id: number;
    dateCreated: string;  //em $date-time
    lastUpdated: string; //em $date-time
    userName?: string;
}

