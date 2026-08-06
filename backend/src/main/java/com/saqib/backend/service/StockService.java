package com.saqib.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.saqib.backend.model.Stock;

@Service
public class StockService {

    public List<Stock> getStocks() {

        return List.of(
            new Stock("Apple", "AAPL", 228.50, 1.24),
            new Stock("Microsoft", "MSFT", 412.30, -0.58),
            new Stock("Tesla", "TSLA", 300.20, 3.81)
        );

    }

}