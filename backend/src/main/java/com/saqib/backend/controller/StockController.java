package com.saqib.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.saqib.backend.model.Stock;
import com.saqib.backend.service.StockService;
import com.saqib.backend.service.TwelveDataService;

@RestController
public class StockController {

    private final StockService stockService;
    private final TwelveDataService twelveDataService;

    public StockController(
            StockService stockService,
            TwelveDataService twelveDataService) {

        this.stockService = stockService;
        this.twelveDataService = twelveDataService;
    }

    @GetMapping("/api/stocks")
    public List<Stock> getStocks() {
        return stockService.getStocks();
    }

    @GetMapping("/api/stocks/{symbol}")
    public Stock getStockData(@PathVariable String symbol) throws Exception {
        return twelveDataService.getStockData(symbol);
    }
}