package com.co.unicaca.pqrsf.servicio;

import java.util.List;

import com.co.unicaca.pqrsf.entidad.Peticionario;

public interface PetServicio {

	public List<Peticionario> listPet();
	
	public Peticionario getPetById(int petId);
	
	public Boolean addPet(Peticionario pet);
	
	public Boolean editPet(int petId, Peticionario pet);
	 
	public Boolean deletePet(int petId); 
	
}
