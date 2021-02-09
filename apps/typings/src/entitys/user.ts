import { IAuditBase } from "./base";

export interface IUser extends IAuditBase {
  id?: string;
  name: string;
  sex?: boolean;
  age?: number;
  address?: string;
  area?: string;
  password: string;
  email: string;
  phone?: string;
}

