import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { Data } from "@/commom/types/data";

export default function DataGraph() {

  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/data")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const chartData = [
    ["Título", "Quantidade"],
    ...data.map((item) => [item.title, item.quantity]),
  ];
  return (
    <Chart
      className="h-[500px]"
      chartType="ColumnChart"
      data={chartData}
      options={{
        title: "Dados de Campanhas",
        vAxis: { title: "Kg" },
      }}
      legendToggle
    />
  );
}
