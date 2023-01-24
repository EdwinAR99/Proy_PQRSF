import { PQRSF } from "../PQRSF/pqrsf";

export class Respuesta {
    
    resId!: number ;
    resFechaRespuesta!: string | null;
    resOficio!: string;
    resAnexo!: string;
    resTiempoRespuesta!: number;
    pqrId!: PQRSF;

}
