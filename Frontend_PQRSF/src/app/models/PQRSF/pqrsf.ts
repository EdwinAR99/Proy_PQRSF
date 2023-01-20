import { Peticionario } from "../Peticionario/peticionario";
import { Traslado } from "../Traslado/traslado";


export class PQRSF {

    pqrId!: number ;
    pqrRadicado!: string;
    pqrTipo!: string;
    petId!: Peticionario;
    pqrFechaAdmision!: string | null;
    pqrFechaVencimiento!: string | null;
    pqrAsunto!: string;
    pqrMedio!: string;
    pqrEstado!: string;
    traId!: Traslado[];
    pqrAnexo!:File;

}
