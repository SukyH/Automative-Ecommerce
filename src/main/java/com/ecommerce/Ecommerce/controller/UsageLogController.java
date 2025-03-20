
package com.ecommerce.Ecommerce.controller;

import com.ecommerce.Ecommerce.dto.ItemDto;
import com.ecommerce.Ecommerce.dto.OrderDto;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.entity.Sales;
import com.ecommerce.Ecommerce.entity.UsageLog;
import com.ecommerce.Ecommerce.repository.ItemRepo;
import com.ecommerce.Ecommerce.service.interf.ItemService;
import com.ecommerce.Ecommerce.service.interf.SalesService;
import com.ecommerce.Ecommerce.service.interf.UsageLogService;
import com.ecommerce.Ecommerce.service.AwsS3Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usage")
public class UsageLogController {
    @Autowired
    private UsageLogService usageService;

    @GetMapping("/report")
    public ResponseEntity<List<UsageLog>> getUsageReport(@RequestParam Long userId) {
        List<UsageLog> logs = usageService.getUsageLogsByUser(userId);
        return ResponseEntity.ok(logs);
    }
}
 
    
