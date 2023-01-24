package com.co.unicaca.pqrsf.servicioImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.co.unicaca.pqrsf.entidad.Respuesta;
import com.co.unicaca.pqrsf.repositorio.IResRepositorio;
import com.co.unicaca.pqrsf.servicio.ResServicio;

@Service
public class ResServicioImpl implements ResServicio {

	private final IResRepositorio resRepositorio;
	
	public ResServicioImpl(IResRepositorio resRepositorio) {
		this.resRepositorio = resRepositorio;
	}

	@Override
	public List<Respuesta> listRes() {
		return resRepositorio.findAll();
	}
	
	@Override
	public Respuesta getResByPqr(int pqrId) {
		return resRepositorio.findByPqrId(pqrId);
	}

	@Override
	public Respuesta getResById(int resId) {
		return resRepositorio.findByResId(resId);
	}

	@Override
	public Boolean addRes(Respuesta res) {
		Respuesta aux = resRepositorio.save(res);
		if (aux != null) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public Boolean editRes(int resId, Respuesta res) {
		Respuesta aux = resRepositorio.findByResId(resId);
		if (aux != null) {
			aux.setResId(resId);
			aux.setPqrId(res.getPqrId());
			aux.setResOficio(res.getResOficio());
			aux.setResFechaRespuesta(res.getResFechaRespuesta());
			aux.setResTiempoRespuesta(res.getResTiempoRespuesta());
			resRepositorio.save(aux);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public Boolean deleteRes(int resId) {
		Respuesta aux = resRepositorio.findByResId(resId);
		if (aux != null) {
			resRepositorio.deleteById(resId);
			return true;
		} else {
			return false;
		}
	}

}
