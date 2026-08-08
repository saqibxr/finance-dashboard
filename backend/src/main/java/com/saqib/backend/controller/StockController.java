package com.saqib.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saqib.backend.model.Stock;
import com.saqib.backend.service.StockService;
import com.saqib.backend.service.AlphaVantageService;

@RestController
public class StockController {

    private final StockService stockService;
    private final AlphaVantageService alphaVantageService;

    public StockController(
            StockService stockService,
            AlphaVantageService alphaVantageService) {

        this.stockService = stockService;
        this.alphaVantageService = alphaVantageService;
    }

    @GetMapping("/api/stocks")
    public List<Stock> getStocks() {
        return stockService.getStocks();
    }

    @GetMapping("/api/stocks/apple")
    public String getAppleData() throws Exception {
        return alphaVantageService.getAppleData();
    }
}