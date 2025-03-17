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

@Data
@Entity
@Table(name="payment")
public class Payment 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int cardNum;
	private int securityCode;
	private String expirationDate;
	private String holderName;
	


	@Column(name = "created_at")
	private final LocalDateTime createdAt = LocalDateTime.now(); 

}
