package com.ecommerce.Ecommerce.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.Ecommerce.entity.Payment;
import com.ecommerce.Ecommerce.entity.UsageLog;

@Repository
public interface UsageLogRepo extends JpaRepository<UsageLog, Long> {

	    List<UsageLog> findByEventtype(String eventtype);
	    List<UsageLog> findByDay(String day);
	    List<UsageLog> findByIpaddress(String ipaddress);
	}
