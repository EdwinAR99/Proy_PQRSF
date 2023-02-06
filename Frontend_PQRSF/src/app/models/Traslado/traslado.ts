import { PQRSF } from "../PQRSF/pqrsf";

export class Traslado {

    traId!: number;
    pqrId!: PQRSF;
    traNombre!: string;
    traDependencia!: string;
    traOficioNum!: string | null;
    traAnexo!: string | null;

}
