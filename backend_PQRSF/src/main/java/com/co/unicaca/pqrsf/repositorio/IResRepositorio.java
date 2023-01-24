package com.co.unicaca.pqrsf.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.co.unicaca.pqrsf.entidad.Respuesta;

@Repository
public interface IResRepositorio extends JpaRepository<Respuesta, Integer>{

	@Query(value = "select * from respuesta where resId=?1",nativeQuery = true)
    Respuesta findByResId(int resId);
	
	@Query(value = "select * from respuesta where pqrId=?1",nativeQuery = true)
	Respuesta findByPqrId(int pqrId);
	
}
