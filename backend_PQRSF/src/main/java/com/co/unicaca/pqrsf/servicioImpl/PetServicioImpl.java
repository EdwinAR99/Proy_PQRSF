package com.co.unicaca.pqrsf.servicioImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.co.unicaca.pqrsf.entidad.Peticionario;
import com.co.unicaca.pqrsf.repositorio.IPetRepositorio;
import com.co.unicaca.pqrsf.servicio.PetServicio;

@Service
public class PetServicioImpl implements PetServicio {
	
	private final IPetRepositorio petRepositorio;

	public PetServicioImpl(IPetRepositorio petRepositorio) {
		this.petRepositorio = petRepositorio;
	}

	@Override
	public List<Peticionario> listPet() {
		return petRepositorio.findAll();
	}

	@Override
	public Peticionario getPetById(int petId) {
		return petRepositorio.findByPetId(petId);
	}

	@Override
	public Boolean addPet(Peticionario pet) {
		Peticionario aux = petRepositorio.save(pet);
		if (aux != null) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public Boolean editPet(int petId, Peticionario pet) {
		Peticionario aux = petRepositorio.findByPetId(petId);
		if (aux != null) {
			aux.setPetId(petId);
			aux.setPetNombre(pet.getPetNombre());
			aux.setPetDireccion(pet.getPetDireccion());
			aux.setPetCorreo(pet.getPetCorreo());
			aux.setPetTelefono(pet.getPetTelefono());
			petRepositorio.save(aux);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public Boolean deletePet(int petId) {
		Peticionario aux = petRepositorio.findByPetId(petId);
		if (aux != null) {
			petRepositorio.deleteById(petId);
			return true;
		} else {
			return false;
		}
	}

}
