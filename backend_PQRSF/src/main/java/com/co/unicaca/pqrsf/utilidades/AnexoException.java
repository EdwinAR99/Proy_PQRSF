
package com.co.unicaca.pqrsf.utilidades;

/**
 *
 * @author Rivera
 */
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;


@ControllerAdvice
public class AnexoException {
    @ExceptionHandler(MaxUploadSizeExceededException.class)
	public ResponseEntity<Response> handleMaxSizeException(MaxUploadSizeExceededException ex) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response("Verifica el tamaño de los archivos recibo"));
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Response> handleException(Exception ex) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response("Verifica el tamaño de los archivos respuesta"));
	} 
}
