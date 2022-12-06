package com.co.unicaca.pqrsf.servicioImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.co.unicaca.pqrsf.entidad.Traslado;
import com.co.unicaca.pqrsf.repositorio.ITraRepositorio;
import com.co.unicaca.pqrsf.servicio.TraServicio;

@Service
public class TraServicioImpl implements TraServicio {

	private final ITraRepositorio traRepositorio;
	
	public TraServicioImpl(ITraRepositorio traRepositorio) {
		this.traRepositorio = traRepositorio;
	}

	@Override
	public List<Traslado> listTra() {
		return traRepositorio.findAll();
	}

	@Override
	public List<Traslado> listTraByPqr(int pqrId) {
		return traRepositorio.findByPqrId(pqrId);
	}

	@Override
	public Traslado getTraById(int traId) {
		return traRepositorio.findByTraId(traId);
	}

	@Override
	public Boolean addTra(Traslado tra) {
		Traslado aux = traRepositorio.save(tra);
		if (aux != null) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public Boolean editTra(int traId, Traslado tra) {
		Traslado aux = traRepositorio.findByTraId(traId);
		if (aux != null) {
			aux.setTraId(traId);
			aux.setPqrId(tra.getPqrId());
			aux.setTraNombre(tra.getTraNombre());
			aux.setTraDependencia(tra.getTraDependencia());
			aux.setTraOficioNum(tra.getTraOficioNum());
			aux.setTraOficio(tra.getTraOficio());
			traRepositorio.save(aux);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public Boolean deleteTra(int traId) {
		Traslado aux = traRepositorio.findByTraId(traId);
		if (aux != null) {
			traRepositorio.deleteById(traId);
			return true;
		} else {
			return false;
		}
	}

}
