package com.co.unicaca.pqrsf.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.co.unicaca.pqrsf.entidad.Traslado;

@Repository
public interface ITraRepositorio extends JpaRepository<Traslado, Integer>{

	@Query(value = "select * from traslado where traId=?1",nativeQuery = true)
    Traslado findByTraId(int traId);
	
	@Query(value = "select * from traslado where pqrId=?1",nativeQuery = true)
	List<Traslado> findByPqrId(int pqrId);

}
