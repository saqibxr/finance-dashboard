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

    const [portfolio, setPortfolio] = useState(() => {

        const savedPortfolio = localStorage.getItem("portfolio");

        return savedPortfolio
            ? JSON.parse(savedPortfolio)
            : [];

    });

    const [shares, setShares] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [portfolioError, setPortfolioError] = useState("");

    async function handleSearch() {

        if (search.trim() === "") {
            return;
        }

        setLoading(true);
        setError("");

        try {

            const data = await getStock(search.toUpperCase());

            setStocks([data]);

            const updatedPortfolio = portfolio.map(holding => {

                if (holding.symbol === data.symbol) {

                    return {
                        ...holding,
                        currentPrice: Number(data.price)
                    };

                }

                return holding;
            });

            setPortfolio(updatedPortfolio);

            localStorage.setItem(
                "portfolio",
                JSON.stringify(updatedPortfolio)
            );

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

    function removeFromPortfolio(symbol) {

        const updatedPortfolio = portfolio.filter(
            holding => holding.symbol !== symbol
        );

        setPortfolio(updatedPortfolio);

        localStorage.setItem(
            "portfolio",
            JSON.stringify(updatedPortfolio)
        );
    }

    function addToPortfolio(stock) {

        setPortfolioError("");

        if (!shares || !purchasePrice) {
            setPortfolioError("Please enter both shares and purchase price.");
            return;
        }

        if (Number(shares) <= 0) {
            setPortfolioError("Shares must be greater than 0.");
            return;
        }

        if (Number(purchasePrice) < 0) {
            setPortfolioError("Purchase price cannot be negative.");
            return;
        }

        const alreadyAdded = portfolio.some(
            holding => holding.symbol === stock.symbol
        );

        if (alreadyAdded) {
            setPortfolioError(
                `${stock.symbol} is already in your portfolio.`
            );
            return;
        }

        const holding = {
            symbol: stock.symbol,
            company: stock.company,
            shares: Number(shares),
            purchasePrice: Number(purchasePrice),
            currentPrice: Number(stock.price)
        };

        const updatedPortfolio = [...portfolio, holding];

        setPortfolio(updatedPortfolio);

        localStorage.setItem(
            "portfolio",
            JSON.stringify(updatedPortfolio)
        );

        setShares("");
        setPurchasePrice("");
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

                        <div className="portfolio-form">

                            <input
                                type="number"
                                placeholder="Shares"
                                value={shares}
                                onChange={(event) =>
                                    setShares(event.target.value)
                                }
                            />

                            <input
                                type="number"
                                placeholder="Purchase price"
                                value={purchasePrice}
                                onChange={(event) =>
                                    setPurchasePrice(event.target.value)
                                }
                            />

                            <button
                                onClick={() => addToPortfolio(stock)}
                            >
                                + Add to Portfolio
                            </button>

                        </div>

                        {portfolioError && (
                            <p className="portfolio-error">
                                {portfolioError}
                            </p>
                        )}

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

            <div className="portfolio">

                <h2>Portfolio</h2>

                {portfolio.length === 0 ? (

                    <p>Your portfolio is empty.</p>

                ) : (

                    <>
                        {portfolio.map((holding, index) => {

                            const shares = Number(holding.shares);
                            const purchasePrice = Number(holding.purchasePrice);
                            const currentPrice = Number(holding.currentPrice);

                            const currentValue =
                                shares * currentPrice;

                            const purchaseValue =
                                shares * purchasePrice;

                            const profitLoss =
                                currentValue - purchaseValue;

                            const returnPercentage =
                                purchaseValue !== 0
                                    ? (profitLoss / purchaseValue) * 100
                                    : 0;

                            return (
                                <div
                                    className="portfolio-item"
                                    key={index}
                                >

                                    <strong>
                                        {holding.company}
                                    </strong>

                                    <span>
                                        {holding.symbol}
                                    </span>

                                    <span>
                                        {shares} shares
                                    </span>

                                    <span>
                                        Purchase: $
                                        {purchasePrice.toFixed(2)}
                                    </span>

                                    <span>
                                        Current: $
                                        {currentPrice.toFixed(2)}
                                    </span>

                                    <span>
                                        Value: $
                                        {currentValue.toFixed(2)}
                                    </span>

                                    <span
                                        className={
                                            profitLoss >= 0
                                                ? "positive"
                                                : "negative"
                                        }
                                    >
                                        P/L:{" "}
                                        {profitLoss >= 0 ? "+" : "-"}$
                                        {Math.abs(profitLoss).toFixed(2)}
                                        {" "}
                                        ({returnPercentage.toFixed(2)}%)
                                    </span>

                                    <button
                                        onClick={() =>
                                            removeFromPortfolio(
                                                holding.symbol
                                            )
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>
                            );
                        })}

                        <div className="portfolio-total">

                            <h3>Portfolio Total</h3>

                            <p>
                                Current Value: $
                                {portfolio
                                    .reduce(
                                        (total, holding) =>
                                            total +
                                            Number(holding.shares) *
                                            Number(holding.currentPrice),
                                        0
                                    )
                                    .toFixed(2)}
                            </p>

                            <p>
                                Total P/L:{" "}
                                {portfolio.reduce(
                                    (total, holding) =>
                                        total +
                                        (
                                            Number(holding.shares) *
                                            Number(holding.currentPrice)
                                        ) -
                                        (
                                            Number(holding.shares) *
                                            Number(holding.purchasePrice)
                                        ),
                                    0
                                ) >= 0
                                    ? "+"
                                    : "-"}
                                $
                                {Math.abs(
                                    portfolio.reduce(
                                        (total, holding) =>
                                            total +
                                            (
                                                Number(holding.shares) *
                                                Number(holding.currentPrice)
                                            ) -
                                            (
                                                Number(holding.shares) *
                                                Number(holding.purchasePrice)
                                            ),
                                        0
                                    )
                                ).toFixed(2)}
                            </p>

                            <p>
                                Total Return:{" "}
                                {(() => {
                                    const totalInvested = portfolio.reduce(
                                        (total, holding) =>
                                            total +
                                            Number(holding.shares) *
                                            Number(holding.purchasePrice),
                                        0
                                    );

                                    const totalProfitLoss = portfolio.reduce(
                                        (total, holding) =>
                                            total +
                                            (
                                                Number(holding.shares) *
                                                Number(holding.currentPrice)
                                            ) -
                                            (
                                                Number(holding.shares) *
                                                Number(holding.purchasePrice)
                                            ),
                                        0
                                    );

                                    const totalReturn =
                                        totalInvested !== 0
                                            ? (totalProfitLoss / totalInvested) * 100
                                            : 0;

                                    return `${totalReturn >= 0 ? "+" : ""}${totalReturn.toFixed(2)}%`;
                                })()}
                            </p>


                        </div>

                    </>

                )}

            </div>

        </div>
    );
}

export default Dashboard;
