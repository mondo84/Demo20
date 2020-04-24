export interface UsuarioI {
  id?: number;
  email: string;
  password: string;
  auth?: boolean;
  token?: string;
  msg?: string;
}
