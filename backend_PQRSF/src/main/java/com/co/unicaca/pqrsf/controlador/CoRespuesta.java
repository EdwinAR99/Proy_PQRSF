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

import com.co.unicaca.pqrsf.entidad.Respuesta;
import com.co.unicaca.pqrsf.servicio.ResServicio;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/respuesta")
public class CoRespuesta {
	
	@Autowired
	private ResServicio resServicio;
	
	@GetMapping(value="/listRespuesta")
	public ResponseEntity list() {
		return new ResponseEntity(resServicio.listRes(), HttpStatus.OK);
	}
	
	@GetMapping(value="/listRespuesta/{resId}")
	public ResponseEntity getRes(@PathVariable(value = "resId") Integer resId) {
		return new ResponseEntity(resServicio.getResById(resId), HttpStatus.OK);
	}
	
	@PostMapping(value="/addRespuesta")
	public ResponseEntity add(@RequestBody Respuesta res) {
		return new ResponseEntity(resServicio.addRes(res), HttpStatus.OK);
	}
	
	@PutMapping(value="/updateRespuesta/{resId}")
	public ResponseEntity update(@PathVariable(value = "resId") Integer resId,@RequestBody Respuesta res) {
		return new ResponseEntity(resServicio.editRes(resId, res), HttpStatus.OK);
	}
	
	@DeleteMapping(value="/deleteRespuesta/{resId}")
	public ResponseEntity delete(@PathVariable(value = "resId") Integer resId) {
		return new ResponseEntity(resServicio.deleteRes(resId), HttpStatus.OK);
	}

}
