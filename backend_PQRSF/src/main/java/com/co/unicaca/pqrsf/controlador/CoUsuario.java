package com.co.unicaca.pqrsf.controlador;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.co.unicaca.pqrsf.entidad.Usuario;
import com.co.unicaca.pqrsf.servicio.UsuServicio;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class CoUsuario {
	
	@Autowired
    private UsuServicio userService;
    
    @GetMapping(value = "/login")
    public ResponseEntity login(@RequestBody Usuario usuario) {
    	return new ResponseEntity(userService.iniciarSesion(usuario.getUsuNombre(), usuario.getUsuContraseña()), HttpStatus.OK);
    }
}
