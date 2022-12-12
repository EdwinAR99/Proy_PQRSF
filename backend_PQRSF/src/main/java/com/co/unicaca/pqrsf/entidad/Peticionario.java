package com.co.unicaca.pqrsf.entidad;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name="peticionario")
public class Peticionario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int petId;
	
	@Column(name="petNombre")
	private String petNombre;
	
	@Column(name="petDireccion")
	private String petDireccion;
	
	@Column(name="petTelefono")
	private String petTelefono;
	
	@Column(name="petCorreo")
	private String petCorreo;
	
	@Column(name="petTipo")
	private String petTipo;

	public Peticionario() {
    }

    public Peticionario(int petId, String petNombre, String petDireccion, String petTelefono, String petCorreo, String petTipo) {
        this.petId = petId;
        this.petNombre = petNombre;
        this.petDireccion = petDireccion;
        this.petTelefono = petTelefono;
        this.petCorreo = petCorreo;
        this.petTipo = petTipo;
    }
    
    public int getPetId() {
		return petId;
	}

	public void setPetId(int petId) {
		this.petId = petId;
	}

	public String getPetNombre() {
        return petNombre;
    }

    public void setPetNombre(String petNombre) {
        this.petNombre = petNombre;
    }

    public String getPetDireccion() {
        return petDireccion;
    }

    public void setPetDireccion(String petDireccion) {
        this.petDireccion = petDireccion;
    }

    public String getPetTelefono() {
        return petTelefono;
    }

    public void setPetTelefono(String petTelefono) {
        this.petTelefono = petTelefono;
    }

    public String getPetCorreo() {
        return petCorreo;
    }

    public void setPetCorreo(String petCorreo) {
        this.petCorreo = petCorreo;
    }

	public String getPetTipo() {
		return petTipo;
	}

	public void setPetTipo(String petTipo) {
		this.petTipo = petTipo;
	}

	@Override
	public String toString() {
		return "Peticionario [petId=" + petId + ", petNombre=" + petNombre + ", petDireccion=" + petDireccion
				+ ", petTelefono=" + petTelefono + ", petCorreo=" + petCorreo + ", petTipo=" + petTipo + "]";
	}

	
    
    
}
