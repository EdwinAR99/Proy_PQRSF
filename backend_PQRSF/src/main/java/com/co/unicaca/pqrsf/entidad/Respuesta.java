package com.co.unicaca.pqrsf.entidad;

import java.sql.Date;
import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="respuesta")
public class Respuesta {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="resId")
    private int resId;
	
	@ManyToOne
	@JoinColumn(name="pqrId")
	private PQRSF pqrId;
	
	@Lob
    @Column(name="resOficioR")
    private String resOficioR;
	
	@Column(name="resAnexoR")
	private String resAnexoR;
    
    @Column(name="resFechaRespuesta")
    private Date resFechaRespuesta;
    
    @Column(name="resTiempoRespuesta")
    private int resTiempoRespuesta;
    
    public Respuesta() {
    }

    public Respuesta(int resId,PQRSF pqrId, String resOficioR, String resAnexoR, Date resFechaRespuesta, int resTiempoRespuesta) {
        this.resId = resId;
        this.pqrId = pqrId;
        this.resOficioR = resOficioR;
        this.resAnexoR = resAnexoR;
        this.resFechaRespuesta = resFechaRespuesta;
        this.resTiempoRespuesta = resTiempoRespuesta;
    }

	public int getResId() {
		return resId;
	}

	public void setResId(int resId) {
		this.resId = resId;
	}

	public PQRSF getPqrId() {
		return pqrId;
	}

	public void setPqrId(PQRSF pqrId) {
		this.pqrId = pqrId;
	}

	public String getResOficioR() {
		return resOficioR;
	}

	public void setResOficioR(String resOficioR) {
		this.resOficioR = resOficioR;
	}

	public String getResAnexoR() {
		return resAnexoR;
	}

	public void setResAnexoR(String resAnexoR) {
		this.resAnexoR = resAnexoR;
	}

	public Date getResFechaRespuesta() {
		return resFechaRespuesta;
	}

	public void setResFechaRespuesta(Date resFechaRespuesta) {
		this.resFechaRespuesta = resFechaRespuesta;
	}

	public int getResTiempoRespuesta() {
		return resTiempoRespuesta;
	}

	public void setResTiempoRespuesta(int resTiempoRespuesta) {
		this.resTiempoRespuesta = resTiempoRespuesta;
	}

	@Override
	public String toString() {
		return "Respuesta [resId=" + resId + ", pqrId=" + pqrId + ", resOficioR=" + resOficioR + ", resAnexoR="
				+ resAnexoR + ", resFechaRespuesta=" + resFechaRespuesta + ", resTiempoRespuesta=" + resTiempoRespuesta
				+ "]";
	}

	
    
    
	
}
