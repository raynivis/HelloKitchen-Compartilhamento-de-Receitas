import { LoginData } from "./login.model";
export interface Usuario extends Partial<LoginData> {
  id: number;
  name: string;
  email: string;
  dateCreated: string; //em $date-time
  lastUpdated: string; // em $date-time
}

