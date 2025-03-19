package com.ecommerce.Ecommerce.service.interf;

import com.ecommerce.Ecommerce.dto.HotDealDto;
import com.ecommerce.Ecommerce.dto.Response;
import com.ecommerce.Ecommerce.entity.HotDeal;

import java.math.BigDecimal;
import java.util.List;

public interface HotDealService {
	Response addHotDeal(Long itemId, BigDecimal discount);
	Response removeHotDeal(Long hotDealId);
    List<HotDeal> getAllHotDeals();
	
}
