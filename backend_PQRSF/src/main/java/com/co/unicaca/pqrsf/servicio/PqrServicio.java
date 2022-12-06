package com.co.unicaca.pqrsf.servicio;

import java.util.List;

import com.co.unicaca.pqrsf.entidad.PQRSF;

public interface PqrServicio {

	public List<PQRSF> listPqr();
	
	public PQRSF getPqrById(int pqrId);
	
	public Boolean addPqr(PQRSF pqr);
	
	public Boolean editPqr(int pqrId, PQRSF pqr);
	 
	public Boolean deletePqr(int pqrId); 
	
}
