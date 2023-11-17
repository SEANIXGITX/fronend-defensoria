export interface BudgetItem {
  idPartida: number;
  codigo: string;
  descripcion: string;
}

export interface BudgetItems {
  idPresupuesto: number;
  operacionId: number;
  montoAprobado: number;
  partida: BudgetItem;
}
