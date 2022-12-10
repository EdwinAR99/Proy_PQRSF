package com.co.unicaca.pqrsf.repositorio;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.co.unicaca.pqrsf.entidad.Usuario;

@Repository
public interface IUsuRepositorio extends JpaRepository<Usuario, String> {
    
	@Query(value = "select * from usuario where usuNombre=?1 and usuContraseña=?2",nativeQuery = true)
    Usuario findByUsuario(String usuNombre, String usuContraseña);

}
