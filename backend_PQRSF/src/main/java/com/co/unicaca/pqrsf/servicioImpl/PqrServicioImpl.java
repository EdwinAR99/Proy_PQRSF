package com.co.unicaca.pqrsf.servicioImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.co.unicaca.pqrsf.entidad.PQRSF;
import com.co.unicaca.pqrsf.repositorio.IPqrRepositorio;
import com.co.unicaca.pqrsf.servicio.PqrServicio;

@Service
public class PqrServicioImpl implements PqrServicio {

	private final IPqrRepositorio pqrRepositorio;
	
	public PqrServicioImpl(IPqrRepositorio pqrRepositorio) {
		this.pqrRepositorio = pqrRepositorio;
	}

	@Override
	public List<PQRSF> listPqr() {
		return pqrRepositorio.findAll();
	}

	@Override
	public PQRSF getPqrById(int pqrId) {
		return pqrRepositorio.findByPqrId(pqrId);
	}

	@Override
	public Boolean addPqr(PQRSF pqr) {
		PQRSF aux = pqrRepositorio.save(pqr);
		if (aux != null) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public Boolean editPqr(int pqrId, PQRSF pqr) {
		PQRSF aux = pqrRepositorio.findByPqrId(pqrId);
		if (aux != null) {
			aux.setPqrId(pqrId);
			aux.setPqrRadicado(pqr.getPqrRadicado());
			aux.setPqrTipo(pqr.getPqrTipo());
			aux.setPetId(pqr.getPetId());
			aux.setPqrFechaAdmision(pqr.getPqrFechaAdmision());
			aux.setPqrFechaVencimiento(pqr.getPqrFechaVencimiento());
			aux.setPqrAsunto(pqr.getPqrAsunto());
			aux.setPqrMedio(pqr.getPqrMedio());
			aux.setPqrEstado(pqr.getPqrEstado());
			aux.setTraId(pqr.getTraId());
			pqrRepositorio.save(aux);
			return true;
		} else {
			return true;
		}
	}

	@Override
	public Boolean deletePqr(int pqrId) {
		PQRSF aux = pqrRepositorio.findByPqrId(pqrId);
		if (aux != null) {
			pqrRepositorio.deleteById(pqrId);
			return true;
		} else {
			return false;
		}
	}

}
