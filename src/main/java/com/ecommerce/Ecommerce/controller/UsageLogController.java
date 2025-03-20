
package com.ecommerce.Ecommerce.controller;

import com.ecommerce.Ecommerce.entity.UsageLog;
import com.ecommerce.Ecommerce.service.interf.UsageLogService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("usage")
public class UsageLogController {

    @Autowired
    private UsageLogService usageLogService;
    @PostMapping("/track")
    public void trackVisit(@RequestParam String ipAddress, @RequestParam String vid, @RequestParam String eventType) {
        usageLogService.trackVisit(ipAddress, vid, eventType);
    }

    @GetMapping("/reports")
    public List<UsageLog> getAllReports() {
        return usageLogService.getAllReports();
    }
}

    
