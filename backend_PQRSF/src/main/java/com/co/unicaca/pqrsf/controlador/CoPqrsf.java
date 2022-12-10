package com.co.unicaca.pqrsf.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.co.unicaca.pqrsf.entidad.PQRSF;
import com.co.unicaca.pqrsf.servicio.PqrServicio;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/pqrsf")
public class CoPqrsf {

	@Autowired
	private PqrServicio pqrServicio; 
	
	@GetMapping(value="/listPqrsf")
	public ResponseEntity list() {
		return new ResponseEntity(pqrServicio.listPqr(), HttpStatus.OK);
	}
	
	@GetMapping(value="/listPqrsf/{pqrId}")
	public ResponseEntity getPqr(@PathVariable(value = "pqrId") Integer pqrId) {
		return new ResponseEntity(pqrServicio.getPqrById(pqrId), HttpStatus.OK);
	}
	
	@PostMapping(value="/addPqrsf")
	public ResponseEntity add(@RequestBody PQRSF pqr) {
		pqr.getTraId().get(0).setPqrId(pqr);
		return new ResponseEntity(pqrServicio.addPqr(pqr), HttpStatus.OK);
	}
	
	@PutMapping(value="/updatePqrsf/{pqrId}")
	public ResponseEntity update(@PathVariable(value = "pqrId") Integer pqrId,@RequestBody PQRSF pqr) {
		return new ResponseEntity(pqrServicio.editPqr(pqrId, pqr), HttpStatus.OK);
	}
	
	@DeleteMapping(value="/deletePqrsf/{pqrId}")
	public ResponseEntity delete(@PathVariable(value = "pqrId") Integer pqrId) {
		return new ResponseEntity(pqrServicio.deletePqr(pqrId), HttpStatus.OK);
	}
	
}
