import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function StockChart(props) {

    const data = props.history;
    const symbol = props.symbol;

    return (
        <div>

            <h3>{symbol} Price History</h3>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>

                    <CartesianGrid />

                    <XAxis dataKey="date"
                        tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short"
                            });
                        }} 
                    />

                    <YAxis 
                        tickFormatter={(value) => `$${value}`}
                    />

                    <Tooltip 
                        formatter={(value) => [`$${value.toFixed(2)}`, "Price"]}
                    />

                    <Line 
                        type="monotone" 
                        dataKey="price" 
                    />

                </LineChart>
            </ResponsiveContainer>

        </div>
    );

}

export default StockChart;