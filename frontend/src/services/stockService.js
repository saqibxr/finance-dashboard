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