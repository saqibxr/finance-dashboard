package com.saqib.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saqib.backend.model.Stock;
import com.saqib.backend.service.StockService;

@RestController
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping("/api/stocks")
    public List<Stock> getStocks() {
        return stockService.getStocks();
    }
}