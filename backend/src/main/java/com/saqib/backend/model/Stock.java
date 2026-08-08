package com.saqib.backend.model;

import java.util.List;

public class Stock {

    private String company;
    private String symbol;
    private double price;
    private double change;
    private List<StockPrice> history;

    public Stock(String company, String symbol, double price, double change, List<StockPrice> history) {
        this.company = company;
        this.symbol = symbol;
        this.price = price;
        this.change = change;
        this.history = history;
    }

    public String getCompany() {
        return company;
    }

    public String getSymbol() {
        return symbol;
    }

    public double getPrice() {
        return price;
    }

    public double getChange() {
        return change;
    }

    public List<StockPrice> getHistory() {
        return history;
    }
}