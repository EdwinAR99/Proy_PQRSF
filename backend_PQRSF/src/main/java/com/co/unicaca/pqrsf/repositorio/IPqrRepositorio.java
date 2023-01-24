package com.co.unicaca.pqrsf.repositorio;

import java.sql.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.co.unicaca.pqrsf.entidad.PQRSF;

@Repository
public interface IPqrRepositorio extends JpaRepository<PQRSF, Integer> {

	@Query(value = "select * from pqrsf where pqrId=?1",nativeQuery = true)
	PQRSF findByPqrId(Integer pqrId);
	
	@Query(value = "update pqrsf set pqrFechaVencimiento=?1, pqrAsunto=?2, pqrMedio=?3, pqrEstado=?4",nativeQuery = true)
	PQRSF updatePqr(Date pqrFechaVencimiento, String pqrAsunto, String pqrMedio, String pqrEstado);
	
}
