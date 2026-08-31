import Navbar from "../components/Navbar";
import StockCard from "../components/StockCard";
import "../styles/Dashboard.css";
import { useState } from "react";
import { getStock } from "../services/stockService";

function Dashboard() {

    const [stocks, setStocks] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSearch() {

        if (search.trim() === "") {
            return;
        }

        setLoading(true);
        setError("");

        try {

            const data = await getStock(search.toUpperCase());

            setStocks([data]);

        } catch (error) {

            console.error(error);
            setError("Stock not found. Please check the symbol.");

        } finally {

            setLoading(false);

        }
    }

    return (
        <div>

            <Navbar />

            <h1>Dashboard</h1>

            <div className="search-container">

                <input
                    type="text"
                    placeholder="Search stock symbol e.g. AAPL"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

                <button onClick={handleSearch}>
                    Search
                </button>

                {loading && <p>Searching...</p>}

                {error && <p>{error}</p>}

            </div>

            <div className="stock-container">

                {stocks.map(stock => (

                    <StockCard
                        key={stock.symbol}
                        company={stock.company}
                        symbol={stock.symbol}
                        price={stock.price}
                        change={stock.change}
                        history={stock.history}
                    />

                ))}

            </div>

        </div>
    );
}

export default Dashboard;
