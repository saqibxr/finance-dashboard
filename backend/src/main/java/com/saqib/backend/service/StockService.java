package com.saqib.backend.service;

import java.util.List;
import java.time.LocalDate;
import org.springframework.stereotype.Service;
import com.saqib.backend.model.Stock;
import com.saqib.backend.model.StockPrice;

@Service
public class StockService {

    public List<Stock> getStocks() {

        List<StockPrice> appleHistory = List.of(
            new StockPrice(LocalDate.of(2026, 8, 3), 220.50),
            new StockPrice(LocalDate.of(2026, 8, 4), 223.10),
            new StockPrice(LocalDate.of(2026, 8, 5), 221.80),
            new StockPrice(LocalDate.of(2026, 8, 6), 226.40),
            new StockPrice(LocalDate.of(2026, 8, 7), 228.50)
        );

        return List.of(
            new Stock("Apple", "AAPL", 228.50, 1.24, appleHistory),
            new Stock("Microsoft", "MSFT", 412.30, -0.58, List.of()),
            new Stock("Tesla", "TSLA", 300.20, 3.81, List.of())
        );

    }

}