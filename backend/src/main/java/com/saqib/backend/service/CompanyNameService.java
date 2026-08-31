package com.saqib.backend.service;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CompanyNameService {

    private final Map<String, String> companyNames = Map.of(
            "AAPL", "Apple",
            "MSFT", "Microsoft",
            "TSLA", "Tesla",
            "NVDA", "NVIDIA",
            "AMZN", "Amazon",
            "GOOGL", "Alphabet",
            "META", "Meta",
            "NFLX", "Netflix"
    );

    public String getCompanyName(String symbol) {

        return companyNames.getOrDefault(
                symbol.toUpperCase(),
                symbol.toUpperCase()
        );
    }
}
