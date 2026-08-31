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

    const data = props.history.map(stock => ({
        ...stock,
        price: Number(stock.price)
    }));

    const symbol = props.symbol;

    return (
        <div>

            <h3>{symbol} Price History</h3>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="date"
                        tickFormatter={(value) => {
                            const date = new Date(value);

                            return date.toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short"
                            });
                        }}
                    />

                    <YAxis
                        tickFormatter={(value) => `$${value.toFixed(2)}`}
                    />

                    <Tooltip
                        formatter={(value) => [
                            `$${Number(value).toFixed(2)}`,
                            "Price"
                        ]}
                        labelFormatter={(value) => {
                            const date = new Date(value);

                            return date.toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                            });
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="price"
                        strokeWidth={2}
                        dot={false}
                    />

                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}

export default StockChart;

