package com.co.unicaca.pqrsf.entidad;

import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="pqrsf")
public class PQRSF {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int pqrId;
	
	@Column(name="pqrRadicado")
	private String pqrRadicado;
	
	@Column(name="pqrTipo")
	private String pqrTipo;
	
	@ManyToOne
	@JoinColumn(name="petId")
	private Peticionario petId;
	
	@Column(name="pqrFechaAdmision")
	private Date pqrFechaAdmision;
	
	@Column(name="pqrFechaVencimiento")
	private Date pqrFechaVencimiento;
	
	@Column(name="pqrAsunto")
	private String pqrAsunto;
	
	@Column(name="pqrMedio")
	private String pqrMedio;

	@Column(name="pqrEstado")
	private String pqrEstado;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="traId")
	private List<Traslado> traId;
	
	@Lob
	@Column(name="pqrAnexo")
	private String pqrAnexo;

	//Constructors
	public PQRSF() {
	}
	
	public PQRSF(int pqrId, String pqrRadicado, String pqrTipo, Peticionario petId, Date pqrFechaAdmision,
			Date pqrFechaVencimiento, String pqrAsunto, String pqrMedio, String pqrEstado, String pqrAnexo) {
		this.pqrId = pqrId;
		this.pqrRadicado = pqrRadicado;
		this.pqrTipo = pqrTipo;
		this.petId = petId;
		this.pqrFechaAdmision = pqrFechaAdmision;
		this.pqrFechaVencimiento = pqrFechaVencimiento;
		this.pqrAsunto = pqrAsunto;
		this.pqrMedio = pqrMedio;
		this.pqrEstado = pqrEstado;
		this.pqrAnexo = pqrAnexo;
	}

	//Getter and Setters
	public int getPqrId() {
		return pqrId;
	}

	public void setPqrId(int pqrId) {
		this.pqrId = pqrId;
	}

	public String getPqrRadicado() {
		return pqrRadicado;
	}

	public void setPqrRadicado(String pqrRadicado) {
		this.pqrRadicado = pqrRadicado;
	}

	public String getPqrTipo() {
		return pqrTipo;
	}

	public void setPqrTipo(String pqrTipo) {
		this.pqrTipo = pqrTipo;
	}

	public Peticionario getPetId() {
		return petId;
	}

	public void setPetId(Peticionario petId) {
		this.petId = petId;
	}

	public Date getPqrFechaAdmision() {
		return pqrFechaAdmision;
	}

	public void setPqrFechaAdmision(Date pqrFechaAdmision) {
		this.pqrFechaAdmision = pqrFechaAdmision;
	}

	public Date getPqrFechaVencimiento() {
		return pqrFechaVencimiento;
	}

	public void setPqrFechaVencimiento(Date pqrFechaVencimiento) {
		this.pqrFechaVencimiento = pqrFechaVencimiento;
	}

	public String getPqrAsunto() {
		return pqrAsunto;
	}

	public void setPqrAsunto(String pqrAsunto) {
		this.pqrAsunto = pqrAsunto;
	}

	public String getPqrMedio() {
		return pqrMedio;
	}

	public void setPqrMedio(String pqrMedio) {
		this.pqrMedio = pqrMedio;
	}

	public String getPqrEstado() {
		return pqrEstado;
	}

	public void setPqrEstado(String pqrEstado) {
		this.pqrEstado = pqrEstado;
	}

	public List<Traslado> getTraId() {
		return traId;
	}

	public void setTraId(List<Traslado> traId) {
		this.traId = traId;
	}
	
	public String getPqrAnexo() {
		return pqrAnexo;
	}

	public void setPqrAnexo(String pqrAnexo) {
		this.pqrAnexo = pqrAnexo;
	}

	@Override
	public String toString() {
		return "PQRSF [pqrId=" + pqrId + ", pqrRadicado=" + pqrRadicado + ", pqrTipo=" + pqrTipo + ", petId=" + petId
				+ ", pqrFechaAdmision=" + pqrFechaAdmision + ", pqrFechaVencimiento=" + pqrFechaVencimiento
				+ ", pqrAsunto=" + pqrAsunto + ", pqrMedio=" + pqrMedio + ", pqrEstado=" + pqrEstado + ", traId="
				+ traId + ", pqrAnexo=" + pqrAnexo + "]";
	}

	
	
}
