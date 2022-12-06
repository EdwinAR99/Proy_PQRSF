package com.co.unicaca.pqrsf.servicioImpl;

import org.springframework.stereotype.Service;

import com.co.unicaca.pqrsf.repositorio.IUsuRepositorio;
import com.co.unicaca.pqrsf.servicio.UsuServicio;

@Service
public class UsuServicioImpl implements UsuServicio{

	private final IUsuRepositorio usuRepositorio;
	
	public UsuServicioImpl(IUsuRepositorio usuRepositorio) {
        this.usuRepositorio = usuRepositorio;
    }
	
	@Override
	public int iniciarSesion(String usuNombre, String usuContraseña) {
		try {
			String nombre = usuRepositorio.findByUsuario(usuNombre, usuContraseña);
            return 1;
        } catch (Exception e) {
            return 0;
        }
	}
}
