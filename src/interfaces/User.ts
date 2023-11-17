export interface Person {
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  fotografia: string;
}
export interface Funcionary {
  id: number;
  cargo: string;
  unidad: string;
  unidadId: number;
}
export interface User {
  id: number;
  nombre: string;
  token: string;
  refreshToken: string;
  habilitado: boolean;
  roles: Array<number>;
  persona: Person;
  funcionario: Funcionary;
}
