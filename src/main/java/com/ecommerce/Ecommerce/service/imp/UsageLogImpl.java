package com.ecommerce.Ecommerce.service.imp;

	import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.Ecommerce.entity.UsageLog;
import com.ecommerce.Ecommerce.repository.UsageLogRepo;
import com.ecommerce.Ecommerce.service.interf.UsageLogService;

import jakarta.persistence.*;
	import lombok.Data;



		@Service
		public class UsageLogImpl implements UsageLogService {

		    @Autowired
		    private UsageLogRepo usageLogRepository;

		    // Implementing the method to track a visit
		    @Override
		    public void trackVisit(String ipAddress, String vid, String eventType) {
		        UsageLog usageLog = new UsageLog();
		        usageLog.setIpaddress(ipAddress);
		        usageLog.setVid(vid);
		        usageLog.setEventtype(eventType);
		        usageLog.setDay(LocalDate.now().toString());

		        usageLogRepository.save(usageLog);
		    }

		    // Implementing the method to get all usage logs
		    @Override
		    public List<UsageLog> getAllReports() {
		        return usageLogRepository.findAll();
		    }
		}
