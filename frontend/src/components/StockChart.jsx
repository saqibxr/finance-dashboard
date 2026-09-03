import "../styles/StockChart.css";

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

    return (
        <div className="stock-chart">

            <h3>{props.symbol} Price History</h3>

            <ResponsiveContainer width="100%" height="100%">

                <LineChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 10,
                        bottom: 30
                    }}
                >

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
                        domain={["auto", "auto"]}
                        tickFormatter={(value) => `$${value.toFixed(0)}`}
                    />

                    <Tooltip
                        labelFormatter={(value) => {

                            const date = new Date(value);

                            return date.toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            });

                        }}
                        formatter={(value) => [
                            `$${Number(value).toFixed(2)}`,
                            "Price"
                        ]}
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