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
    const [watchlist, setWatchlist] = useState(() => {

        const savedWatchlist = localStorage.getItem("watchlist");

        return savedWatchlist
            ? JSON.parse(savedWatchlist)
            : [];

    });

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

    function addToWatchlist(stock) {

        const alreadyAdded = watchlist.some(
            item => item.symbol === stock.symbol
        );

        if (!alreadyAdded) {

            const updatedWatchlist = [...watchlist, stock];

            setWatchlist(updatedWatchlist);

            localStorage.setItem(
                "watchlist",
                JSON.stringify(updatedWatchlist)
            );
        }
    }

    function removeFromWatchlist(symbol) {

        const updatedWatchlist = watchlist.filter(
            stock => stock.symbol !== symbol
        );

        setWatchlist(updatedWatchlist);

        localStorage.setItem(
            "watchlist",
            JSON.stringify(updatedWatchlist)
        );
    }

    return (
        <div className="dashboard">

            <Navbar />

            <h1>Dashboard</h1>

            <div className="search-container">

                <input
                    type="text"
                    placeholder="Search stock symbol e.g. AAPL"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

                <button onClick={handleSearch} disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>

            </div>

            {loading && (
                <p className="loading-message">
                    Searching for stock...
                </p>
            )}

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            <div className="stock-container">

                {stocks.map(stock => (

                    <div key={stock.symbol}>

                        <StockCard
                            company={stock.company}
                            symbol={stock.symbol}
                            price={stock.price}
                            change={stock.change}
                            history={stock.history}
                        />

                        <button
                            onClick={() => addToWatchlist(stock)}
                        >
                            + Add to Watchlist
                        </button>

                    </div>

                ))}

            </div>

            <div className="watchlist">

                <h2>Watchlist</h2>

                {watchlist.length === 0 ? (

                    <p>Your watchlist is empty.</p>

                ) : (

            watchlist.map(stock => (

                <div
                    className="watchlist-item"
                    key={stock.symbol}
                >

                    <div className="watchlist-stock">

                        <strong>{stock.company}</strong>

                        <span>{stock.symbol}</span>

                    </div>

                    <div className="watchlist-price">

                        <strong>
                            ${Number(stock.price).toFixed(2)}
                        </strong>

                        <span
                            className={
                                stock.change >= 0
                                    ? "positive"
                                    : "negative"
                            }
                        >
                            {stock.change >= 0 ? "▲" : "▼"}{" "}
                            {Number(stock.change).toFixed(2)}%
                        </span>

                    </div>

                    <button
                        onClick={() =>
                            removeFromWatchlist(stock.symbol)
                        }
                    >
                        Remove
                    </button>

                </div>

            ))

                )}

            </div>

        </div>
    );
}

export default Dashboard;