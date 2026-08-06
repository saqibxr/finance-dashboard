import "../styles/StockCard.css";

function StockCard(props) {

    return (
        <div className="stock-card">

            <h2>{props.company}</h2>

            <p>
                Price: ${props.price}
            </p>

        </div>
    );

}

export default StockCard;