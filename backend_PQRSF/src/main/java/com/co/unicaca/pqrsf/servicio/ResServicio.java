package com.co.unicaca.pqrsf.servicio;

import java.util.List;

import com.co.unicaca.pqrsf.entidad.Respuesta;


public interface ResServicio {

	public List<Respuesta> listRes();
	
	public Respuesta getResByPqr(int pqrId);
	
	public Respuesta getResById(int resId);
	
	public Boolean addRes(Respuesta res);
	
	public Boolean editRes(int resId, Respuesta res);
	 
	public Boolean deleteRes(int resId); 
	
}
