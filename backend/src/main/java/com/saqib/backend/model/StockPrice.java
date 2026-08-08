package com.saqib.backend.model;

import java.time.LocalDate;

public class StockPrice {

    private LocalDate date;
    private double price;

    public StockPrice(LocalDate date, double price) {
        this.date = date;
        this.price = price;
    }

    public LocalDate getDate() {
        return date;
    }

    public double getPrice() {
        return price;
    }
}