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

import com.co.unicaca.pqrsf.entidad.Peticionario;
import com.co.unicaca.pqrsf.servicio.PetServicio;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/peticionario")
public class CoPeticionario {
	
	@Autowired
	private PetServicio petServicio;
	
	@GetMapping(value="/listPeticionario")
	public ResponseEntity list() {
		return new ResponseEntity(petServicio.listPet(), HttpStatus.OK);
	}
	
	@GetMapping(value="/listPeticionario/{petId}")
	public ResponseEntity getPet(@PathVariable(value = "petId") Integer petId) {
		return new ResponseEntity(petServicio.getPetById(petId), HttpStatus.OK);
	}
	
	@PostMapping(value="/addPeticionario")
	public ResponseEntity add(@RequestBody Peticionario pet) {
		return new ResponseEntity(petServicio.addPet(pet), HttpStatus.OK);
	}
	
	@PutMapping(value="/updatePeticionario/{petId}")
	public ResponseEntity update(@PathVariable(value = "petId") Integer petId,@RequestBody Peticionario pet) {
		return new ResponseEntity(petServicio.editPet(petId, pet), HttpStatus.OK);
	}
	
	@DeleteMapping(value="/deletePeticionario/{petId}")
	public ResponseEntity delete(@PathVariable(value = "petId") Integer petId) {
		return new ResponseEntity(petServicio.deletePet(petId), HttpStatus.OK);
	}

}
