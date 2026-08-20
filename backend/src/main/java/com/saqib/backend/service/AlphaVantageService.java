package com.saqib.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.saqib.backend.model.Stock;
import com.saqib.backend.model.StockPrice;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDate;
import java.util.ArrayList;

@Service
public class AlphaVantageService {

    @Value("${alpha.vantage.api.key}")
    private String apiKey;

    private final ObjectMapper objectMapper;

    public AlphaVantageService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public Stock getAppleData() throws Exception {

        String url = "https://www.alphavantage.co/query"
                + "?function=TIME_SERIES_DAILY"
                + "&symbol=AAPL"
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

        JsonNode timeSeries = json.get("Time Series (Daily)");
        List<StockPrice> history = new ArrayList<>();

        var dates = timeSeries.propertyNames().iterator();

        String latestDate = dates.next();
        String previousDate = dates.next();

        JsonNode latestData = timeSeries.get(latestDate);
        JsonNode previousData = timeSeries.get(previousDate);

        double latestPrice = Double.parseDouble(
                latestData.get("4. close").asText()
        );

        double previousPrice = Double.parseDouble(
                previousData.get("4. close").asText()
        );

        double change = ((latestPrice - previousPrice) / previousPrice) * 100;

        for (String date : timeSeries.propertyNames()) {

            JsonNode dayData = timeSeries.get(date);

            double close = Double.parseDouble(
                    dayData.get("4. close").asText()
            );

            history.add(
                    new StockPrice(
                            LocalDate.parse(date),
                            close
                    )
            );
        }

        return new Stock(
                "Apple",
                "AAPL",
                latestPrice,
                change,
                history
        );
    
    }

}