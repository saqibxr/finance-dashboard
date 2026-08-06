import Navbar from "../components/Navbar";
import StockCard from "../components/StockCard";
import "../styles/Dashboard.css";
import { useEffect, useState } from "react";
import { getStocks } from "../services/stockService";

function Dashboard() {

    const [stocks, setStocks] = useState([]);

    useEffect(() => {

        getStocks()
            .then(data => {
                setStocks(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    return (
        <div>

            <Navbar />

            <h1>Dashboard</h1>

            <div className="stock-container">

                {stocks.map(stock => (

                    <StockCard
                        key={stock.company}
                        company={stock.company}
                        price={stock.price}
                    />

                ))}

            </div>

        </div>
    );
}

export default Dashboard;