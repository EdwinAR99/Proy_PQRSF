package com.co.unicaca.pqrsf.servicio;

import java.util.List;

import com.co.unicaca.pqrsf.entidad.Traslado;

public interface TraServicio {

	public List<Traslado> listTra();
	
	public List<Traslado> listTraByPqr(int pqrId);
	
	public Traslado getTraById(int traId);
	
	public Boolean addTra(Traslado tra);
	
	public Boolean editTra(int traId, Traslado tra);
	 
	public Boolean deleteTra(int traId); 
	
}
