export interface RequestParameter {
  gestionId: number;
  procesoId: number;
  tipoSolicitudId: number;
  unidadId: number;
  usuarioId: number;
  objetoContratacion: string;
  justificacion: string;
  requeridoPara: string;
}
export interface Request {
  idSolicitud: number;
  gestionId: number;
  procesoId: number;
  tipoSolicitudId: number;
  tipoContratacionId: number;
  tipoAdjudicacionId: number;
  unidadId: number;
  nroSolicitud: number;
  fechaRegistro: string;
  usuarioId: string;
  objetoContratacion: string;
  justificacion: string;
  requeridoPara: string;
  fechaCertificacion?: string;
  nroCertificacion?: number;
  devolucion?: string;
  cuce?: string;
  estadoId: number;
}
