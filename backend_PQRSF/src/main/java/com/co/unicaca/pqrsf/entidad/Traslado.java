package com.co.unicaca.pqrsf.entidad;

import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="traslado")
public class Traslado {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="traId")
    private int traId;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name="pqrId")
	private PQRSF pqrId;
	
    @Column(name="traNombre")
    private String traNombre;
    
    @Column(name="traDependencia")
    private String traDependencia;
    
    @Column(name="traOficioNum")
    private String traOficioNum;
    
    @Column(name="traOficio")
    private byte[] traOficio;
    
	public Traslado() {
	}

	public Traslado(int traId, PQRSF pqrId, String traNombre, String traDependencia, String traOficioNum, byte[] traOficio) {
		this.traId = traId;
		this.pqrId = pqrId;
		this.traNombre = traNombre;
		this.traDependencia = traDependencia;
		this.traOficioNum = traOficioNum;
		this.traOficio = traOficio;
	}

	public int getTraId() {
		return traId;
	}

	public void setTraId(int traId) {
		this.traId = traId;
	}

	public PQRSF getPqrId() {
		return pqrId;
	}

	public void setPqrId(PQRSF pqrId) {
		this.pqrId = pqrId;
	}

	public String getTraNombre() {
		return traNombre;
	}

	public void setTraNombre(String traNombre) {
		this.traNombre = traNombre;
	}

	public String getTraDependencia() {
		return traDependencia;
	}

	public void setTraDependencia(String traDependencia) {
		this.traDependencia = traDependencia;
	}

	public String getTraOficioNum() {
		return traOficioNum;
	}

	public void setTraOficioNum(String traOficioNum) {
		this.traOficioNum = traOficioNum;
	}

	public byte[] getTraOficio() {
		return traOficio;
	}

	public void setTraOficio(byte[] traOficio) {
		this.traOficio = traOficio;
	}

	@Override
	public String toString() {
		return "Traslado [traId=" + traId + ", pqrId=" + pqrId + ", traNombre=" + traNombre + ", traDependencia="
				+ traDependencia + ", traOficioNum=" + traOficioNum + ", traOficio=" + Arrays.toString(traOficio)
				+ "]";
	}
    
}
