import { PQRSF } from "../PQRSF/pqrsf";

export class Traslado {

    traId!: number;
    pqrId!: PQRSF;
    traNombre!: string;
    traDependencia!: string;
    traOficioSeg!: string | null;
    traOficioFecha!: string | null;
    traOficioNum!: string | null;
    traAnexo!: string | null;

}
