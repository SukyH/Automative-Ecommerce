package com.ecommerce.Ecommerce.controller;

import com.ecommerce.Ecommerce.dto.HotDealDto;
import com.ecommerce.Ecommerce.dto.Response;
import com.ecommerce.Ecommerce.entity.HotDeal;
import com.ecommerce.Ecommerce.service.interf.HotDealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/hot-deals")
@RequiredArgsConstructor
public class HotDealController {

    private final HotDealService hotDealService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/add/{itemId}")
    public ResponseEntity<Response> addHotDeal(@PathVariable Long itemId, @RequestParam BigDecimal discount) {
        return ResponseEntity.ok(hotDealService.addHotDeal(itemId, discount));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/remove/{hotDealId}")
    public ResponseEntity<Void> removeHotDeal(@PathVariable Long hotDealId) {
        hotDealService.removeHotDeal(hotDealId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<HotDeal>> getAllHotDeals() {
        return ResponseEntity.ok(hotDealService.getAllHotDeals());
    }

}
