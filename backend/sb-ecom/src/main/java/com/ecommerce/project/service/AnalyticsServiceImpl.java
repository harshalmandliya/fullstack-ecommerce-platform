package com.ecommerce.project.service;

import com.ecommerce.project.payload.AnalyticsResponse;
import com.ecommerce.project.repositories.OrderRepository;
import com.ecommerce.project.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    @Autowired
    private ProductRepository productRepository;
     @Autowired
    private OrderRepository orderRepository;

    @Override
    public AnalyticsResponse getAnalyticsResponse() {
      AnalyticsResponse response = new AnalyticsResponse();
      long productCount = productRepository.count();
      long orderCount = orderRepository.count();
      Double totalRevenue=orderRepository.getTotalRevenue();
      response.setProductCount(productCount);
      response.setTotalOrders(orderCount);
      response.setTotalRevenue(totalRevenue);
     return response;
    }
}
