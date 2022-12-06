package com.co.unicaca.pqrsf.entidad;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="usuario")
public class Usuario {
    
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="usuNombre", columnDefinition="varchar(50)")
    private String usuNombre;
	
	@Column(name="usuContraseña")
    private String usuContraseña;
    
    //Constructor
	public Usuario(){	
	}
	
    public Usuario(String usuNombre, String usuContraseña) {
    	this.usuNombre = usuNombre;
    	this.usuContraseña = usuContraseña;
    }

	//Getter and setters
    public String getUsuNombre() {
        return usuNombre;
    }

    public void setUsuNombre(String usuNombre) {
        this.usuNombre = usuNombre;
    }

    public String getUsuContraseña() {
        return usuContraseña;
    }

    public void setUsuContraseña(String usuContraseña) {
        this.usuContraseña = usuContraseña;
    }
    
    @Override
    public String toString() {
    	return "User [usuNombre=" + usuNombre+ ", usuContraseña=" + usuContraseña + "]";
    }
}
