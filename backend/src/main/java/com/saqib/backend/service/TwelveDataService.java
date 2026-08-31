package com.saqib.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.saqib.backend.model.Stock;
import com.saqib.backend.model.StockPrice;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class TwelveDataService {

    @Value("${twelve.data.api.key}")
    private String apiKey;

    private final ObjectMapper objectMapper;
    private final CompanyNameService companyNameService;

    public TwelveDataService(
            ObjectMapper objectMapper,
            CompanyNameService companyNameService) {

        this.objectMapper = objectMapper;
        this.companyNameService = companyNameService;
    }

    public Stock getStockData(String symbol) throws Exception {

        String url = "https://api.twelvedata.com/time_series"
                + "?symbol=" + symbol
                + "&interval=1day"
                + "&outputsize=30"
                + "&apikey=" + apiKey;

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        HttpResponse<String> response = client.send(
                request,
                HttpResponse.BodyHandlers.ofString()
        );

        JsonNode json = objectMapper.readTree(response.body());

        // Check for API errors
        if (json.has("status") && json.get("status").asText().equals("error")) {
            throw new RuntimeException(
                    json.get("message").asText()
            );
        }

        JsonNode values = json.get("values");

        if (values == null || !values.isArray() || values.isEmpty()) {
            throw new RuntimeException(
                    "No stock data found for symbol: " + symbol
            );
        }

        List<StockPrice> history = new ArrayList<>();

        // Twelve Data returns newest first
        for (JsonNode day : values) {

            LocalDate date = LocalDate.parse(
                    day.get("datetime").asText()
            );

            double close = Double.parseDouble(
                    day.get("close").asText()
            );

            history.add(
                    new StockPrice(
                            date,
                            close
                    )
            );
            
            history.sort(
                (a, b) -> a.getDate().compareTo(b.getDate())
);
        }

        // First item is the latest day
        double latestPrice = Double.parseDouble(
                values.get(0).get("close").asText()
        );

        double previousPrice = Double.parseDouble(
                values.get(1).get("close").asText()
        );

        double change =
                ((latestPrice - previousPrice) / previousPrice) * 100;

        return new Stock(
                companyNameService.getCompanyName(symbol),
                symbol.toUpperCase(),
                latestPrice,
                change,
                history
        );
    }
}