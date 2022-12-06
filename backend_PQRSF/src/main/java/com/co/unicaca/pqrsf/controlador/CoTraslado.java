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
import com.co.unicaca.pqrsf.entidad.Traslado;
import com.co.unicaca.pqrsf.servicio.TraServicio;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping(value = "/traslado")
public class CoTraslado {

	@Autowired
	private TraServicio traServicio;
	
	@GetMapping(value="/listTraslado")
	public ResponseEntity list() {
		return new ResponseEntity(traServicio.listTra(), HttpStatus.OK);
	}
	
	@GetMapping(value="/{pqrId}/listTraslado")
	public ResponseEntity listByPqr(@PathVariable(value = "pqrId")Integer pqrId) {
		return new ResponseEntity(traServicio.listTraByPqr(pqrId), HttpStatus.OK);
	}
	
	@GetMapping(value="/listTraslado/{traId}")
	public ResponseEntity getRes(@PathVariable(value = "traId") Integer traId) {
		return new ResponseEntity(traServicio.getTraById(traId), HttpStatus.OK);
	}
	
	@PostMapping(value="/{pqrId}/addTraslado")
	public ResponseEntity addByPqr(@PathVariable(value = "pqrId")Integer pqrId, @RequestBody Traslado tra) {
		tra.setPqrId(new PQRSF());
		tra.getPqrId().setPqrId(pqrId);
		return new ResponseEntity(traServicio.addTra(tra), HttpStatus.OK);
	}
	
	@PostMapping(value="/addTraslado")
	public ResponseEntity add(@RequestBody Traslado tra) {
		return new ResponseEntity(traServicio.addTra(tra), HttpStatus.OK);
	}
	
	@PutMapping(value="/updateTraslado/{traId}")
	public ResponseEntity update(@PathVariable(value = "traId") Integer traId,@RequestBody Traslado tra) {
		return new ResponseEntity(traServicio.editTra(traId, tra), HttpStatus.OK);
	}
	
	@DeleteMapping(value="/deleteTraslado/{traId}")
	public ResponseEntity delete(@PathVariable(value = "traId") Integer traId) {
		return new ResponseEntity(traServicio.deleteTra(traId), HttpStatus.OK);
	}

	
}
