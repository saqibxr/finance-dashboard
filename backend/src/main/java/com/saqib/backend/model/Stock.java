package com.saqib.backend.model;

public class Stock {

    private String company;
    private String symbol;
    private double price;
    private double change;

    public Stock(String company, String symbol, double price, double change) {
        this.company = company;
        this.symbol = symbol;
        this.price = price;
        this.change = change;
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
}