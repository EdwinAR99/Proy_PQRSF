package com.co.unicaca.pqrsf.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.co.unicaca.pqrsf.entidad.Peticionario;

@Repository
public interface IPetRepositorio extends JpaRepository<Peticionario, Integer>{

	@Query(value = "select * from peticionario where petId=?1",nativeQuery = true)
    Peticionario findByPetId(int petId);
	
}
