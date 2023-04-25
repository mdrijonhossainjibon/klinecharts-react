import React, { useEffect, useState } from "react";
import { init, dispose, Chart } from "klinecharts";
import Layout from "../Layout";

function Update() {
  const [ data,setdata ] = useState({
          timestamp: 1682396040000 / 1000,
          open: 0,
          high: 2,
          low: 3,
          close: 5,
        })
  useEffect(() => {
    let chart: Chart | null = null; // Initialize chart variable as null
    
    // Create the chart
    chart = init("update-k-line");
    chart?.createIndicator("MA", false, { id: "candle_pane" });
    chart?.createIndicator("VOL");
    
    
     //chart?.updateData(data);
  
    const fetchKlineData = async () => {
      try {
        const symbol = "btcusdt";
        const interval = "1m";
        //const limit = 1000;
        const url = `https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=${interval}`;

        const response = await fetch(url);
        const klineDataList: any[][] = await response.json(); // Type annotation for API response

        // Extract relevant data from API response
        const dataList = klineDataList.map(
          ([timestamp, open, high, low, close, volume]: any[]) => ({
            // Type annotation for extracted data
            timestamp: timestamp / 1000,
            open: Number(open),
            high: Number(high),
            low: Number(low),
            close: Number(close),
            volume: Number(volume),
          })
        );

        // Apply data to the chart
        chart?.applyNewData(dataList);
       
      } catch (error) {
        console.error("Failed to fetch Kline data:");
      }
    };
    fetchKlineData();
    //setInterval(fetchKlineData, 1000);

    return () => {
      // Dispose chart on component unmount
      if (chart) {
        dispose("update-k-line");
      }
    };
  }, []);

  return (
    <Layout title="Real-time Update">
      <div id="update-k-line" className="k-line-chart" />
    </Layout>
  );
}

export default Update;
