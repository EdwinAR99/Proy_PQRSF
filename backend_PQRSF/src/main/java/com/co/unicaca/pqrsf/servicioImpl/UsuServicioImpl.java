package com.co.unicaca.pqrsf.servicioImpl;

import org.springframework.stereotype.Service;

import com.co.unicaca.pqrsf.entidad.Usuario;
import com.co.unicaca.pqrsf.repositorio.IUsuRepositorio;
import com.co.unicaca.pqrsf.servicio.UsuServicio;

@Service
public class UsuServicioImpl implements UsuServicio{

	private final IUsuRepositorio usuRepositorio;
	
	public UsuServicioImpl(IUsuRepositorio usuRepositorio) {
        this.usuRepositorio = usuRepositorio;
    }
	
	@Override
	public boolean iniciarSesion(String usuNombre, String usuContraseña) {
		try {
			Usuario usu = usuRepositorio.findByUsuario(usuNombre, usuContraseña);
			if (usuNombre.equals(usu.getUsuNombre()) && usuContraseña.equals(usu.getUsuContraseña())) {
				return true;
			}
			return false;
        } catch (Exception e) {
            return false;
        }
	}
}
