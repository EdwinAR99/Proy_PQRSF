package com.co.unicaca.pqrsf.entidad;

import java.util.Arrays;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
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
    
    @Column(name="traOficioFecha")
    private Date traOficioFecha;
    
    @Column(name="traOficioSeg")
    private String traOficioSeg;
    
    @Column(name="traOficioNum")
    private String traOficioNum;

    @Column(name="traOficio")
    private String traAnexo;
    
	public Traslado() {
	}

	public Traslado(int traId, PQRSF pqrId, String traNombre, String traDependencia, Date traOficioFecha,
			String traOficioSeg, String traOficioNum, String traAnexo) {
		super();
		this.traId = traId;
		this.pqrId = pqrId;
		this.traNombre = traNombre;
		this.traDependencia = traDependencia;
		this.traOficioFecha = traOficioFecha;
		this.traOficioSeg = traOficioSeg;
		this.traOficioNum = traOficioNum;
		this.traAnexo = traAnexo;
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

	public Date getTraOficioFecha() {
		return traOficioFecha;
	}

	public void setTraOficioFecha(Date traOficioFecha) {
		this.traOficioFecha = traOficioFecha;
	}

	public String getTraOficioSeg() {
		return traOficioSeg;
	}

	public void setTraOficioSeg(String traOficioSeg) {
		this.traOficioSeg = traOficioSeg;
	}

	public String getTraOficioNum() {
		return traOficioNum;
	}

	public void setTraOficioNum(String traOficioNum) {
		this.traOficioNum = traOficioNum;
	}

	public String getTraAnexo() {
		return traAnexo;
	}

	public void setTraAnexo(String traAnexo) {
		this.traAnexo = traAnexo;
	}

	@Override
	public String toString() {
		return "Traslado [traId=" + traId + ", pqrId=" + pqrId + ", traNombre=" + traNombre + ", traDependencia="
				+ traDependencia + ", traOficioFecha=" + traOficioFecha + ", traOficioSeg=" + traOficioSeg
				+ ", traOficioNum=" + traOficioNum + ", traAnexo=" + traAnexo + "]";
	}	
    
}
