package com.ecommerce.Ecommerce.entity;

import org.joda.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;


	@Entity
	@Table(name = "VisitEvent")
	@Data  // Lombok annotation to generate getters, setters, toString, equals, etc.
	public class UsageLog {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(name = "ip_address")
	    private String ipaddress;
	    private String day;
	    private String vid;
	    @Column(name = "event_type")  
	    private String eventtype;
	}
	


