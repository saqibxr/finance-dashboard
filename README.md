# Finance Dashboard

A full-stack financial market dashboard built with:

* React
* Vite
* Spring Boot
* Twelve Data API
* Recharts
* Java
* CSS

## Features

* 🔎 Stock search by ticker symbol
* 📈 Historical stock price charts
* 💰 Current stock price and daily percentage change
* ⭐ Watchlist with local storage persistence
* 💼 Portfolio tracker
* 📊 Portfolio current value and profit/loss
* 📈 Individual and total portfolio return percentages
* 🗑️ Add and remove portfolio holdings
* ⚠️ Input validation and error handling
* 💾 Portfolio and watchlist data stored using browser local storage

## How It Works

The application follows a full-stack architecture:

React + Vite
      ↓
Spring Boot REST API
      ↓
Twelve Data API
      ↓
Stock Market Data


The React frontend communicates with the Spring Boot backend, which retrieves financial data from the Twelve Data API and returns it to the dashboard.

## Tech Stack

### Frontend

* React
* Vite
* Recharts
* CSS

### Backend

* Java
* Spring Boot
* REST API
* Twelve Data API

### Storage

* Browser Local Storage

## Current Status

**Mainly completed**

Core stock search, data visualisation, watchlist and portfolio functionality are implemented.

Future improvements may include deployment, database integration and additional financial data.