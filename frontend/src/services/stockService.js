const API_URL = "http://localhost:8080";

export async function testBackend() {

    const response = await fetch(
        `${API_URL}/api/test`
    );

    return await response.text();
}

export async function getStocks() {

    const response = await fetch(
        `${API_URL}/api/stocks`
    );

    return await response.json();
}

export async function getStock(symbol) {

    const response = await fetch(
        `${API_URL}/api/stocks/${symbol}`
    );

    if (!response.ok) {
        throw new Error("Stock not found");
    }

    return await response.json();
}