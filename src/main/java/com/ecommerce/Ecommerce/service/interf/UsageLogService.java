package com.ecommerce.Ecommerce.service.interf;

import org.springframework.stereotype.Repository;
import com.ecommerce.Ecommerce.entity.UsageLog;
import com.ecommerce.Ecommerce.entity.User;
import java.util.List;




public interface UsageLogService {
void trackVisit(String ipAddress, String vid, String eventType);
 List<UsageLog> getAllReports();
	}

