package com.ecommerce;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import io.github.cdimascio.dotenv.Dotenv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class EcommerceApplication {

public static void main(String[] args) {
	  Dotenv dotenv = Dotenv.load();
      System.setProperty("DB_URL", dotenv.get("DB_URL"));
      System.setProperty("DB_USER", dotenv.get("DB_USER"));
      System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
      

		 
		SpringApplication.run(EcommerceApplication.class, args);
	}

	
	
}
