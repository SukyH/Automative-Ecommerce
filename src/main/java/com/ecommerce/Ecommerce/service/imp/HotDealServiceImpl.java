package com.ecommerce.Ecommerce.service.imp;

import com.ecommerce.Ecommerce.dto.Response;
import com.ecommerce.Ecommerce.entity.HotDeal;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.repository.HotDealRepo;
import com.ecommerce.Ecommerce.service.interf.HotDealService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.ecommerce.Ecommerce.repository.ItemRepo;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class HotDealServiceImpl implements HotDealService {

	private final ItemRepo itemRepo;
    private final HotDealRepo hotDealRepo;

    @Override
    public Response addHotDeal(Long itemId, BigDecimal discount) {
        Item item = itemRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found with ID: " + itemId));

        HotDeal hotDeal = HotDeal.builder()
                .item(item)
                .createdAt(LocalDateTime.now())
                .discountPercentage(discount)
                .build();

        hotDealRepo.save(hotDeal);
        log.info("Hot deal added for item ID: {} with discount: {}", itemId, discount);

        return Response.builder()
                .status(200)
                .message("Hot deal successfully added")
                .build();
    }


    @Override
    public List<HotDeal> getAllHotDeals() {
        return hotDealRepo.findAll();
    }

    @Override
    public Response removeHotDeal(Long hotDealId) {
        if (!hotDealRepo.existsById(hotDealId)) {
            throw new RuntimeException("Hot deal not found");
        }
        hotDealRepo.deleteById(hotDealId);
        log.info("Hot deal removed with ID: {}", hotDealId);

        return Response.builder()
                .status(200)
                .message("Hot deal successfully removed")
                .build();
    }
}
