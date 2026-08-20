import "../styles/StockCard.css";
import StockChart from "./StockChart";

function StockCard(props) {

    const changeClass = props.change >= 0 ? "positive" : "negative";
    const changeIndicator = props.change >= 0 ? "▲" : "▼";

    return (
        <div className="stock-card">

            <h2>{props.company}</h2>

            <p>{props.symbol}</p>

            <p>
                Price: ${Number(props.price).toFixed(2)}
            </p>

            <p className={changeClass}>
                {changeIndicator} {Number(props.change).toFixed(2)}%
            </p>

            {props.history.length > 0
                ? <StockChart 
                    history={props.history} 
                    symbol={props.symbol}
                />
                : <p>No historical data available</p>
            }

        </div>
    );

}

export default StockCard;