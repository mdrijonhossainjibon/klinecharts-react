import { useEffect, useRef } from "react";
import { init, dispose, Chart, KLineData } from "klinecharts";

import Layout from "../Layout";

export default function Indicator() {
  const chart = useRef<Chart | null>(null);
  const paneId = useRef<string>("");

  useEffect(() => {
    chart.current = init("indicator-k-line");
    paneId.current = chart.current?.createIndicator("VOL") as string;

    chart.current?.createIndicator("MA", false, {
      id: "candle_pane",
    });

    chart.current?.applyNewData([
      {
        open: 0,
        close: 0,
        high: 0,
        low: 0,
        timestamp: Date.now() - 9 * 1000,
        volume: 0,
      },
    ]);
    setInterval(() => {
      chart.current?.updateData({
        open: Math.random(),
        close: Math.random(),
        high: Math.random(),
        low: Math.random(),
        timestamp: Date.now() - 9 * 1000,
        volume: Math.floor(Math.random() * 10),
      });
      return () => {
        dispose("k-line-chart");
      };
    }, 10000);
  }, []);

  return (
    <div className="k-line-chart-container">
      <div id="indicator-k-line" className="k-line-chart" />
      <div className="k-line-chart-menu-container"></div>
    </div>
  );
}
