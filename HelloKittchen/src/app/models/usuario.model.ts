import { LoginData } from "./login.model";
export interface Usuario extends Partial<LoginData> {
  name: string;
  email: string;
  password: string;
  id: 0;
  dateCreated: string; //em $date-time
  lastUpdated: string; // em $date-time
}

