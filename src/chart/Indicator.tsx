import { useEffect, useRef } from "react";
import { init, dispose, Chart, KLineData } from "klinecharts";

import Layout from "../Layout";

export default function Indicator(props: any) {
  const chart = useRef<Chart | null>(null);
  const paneId = useRef<string>("");

  useEffect(() => {
    chart.current = init("indicator-k-line");
    paneId.current = chart.current?.createIndicator("VOL") as string;

    chart.current?.createIndicator("MA", false, {
      id: "candle_pane",
    });

    chart.current?.applyNewData(props.intialldata ? props.intialldata : []);

    const UpdateFunction = (newdata: any) => {
      chart.current?.updateData(newdata);

      return () => {
        dispose("k-line-chart");
      };
    };

    setInterval(() => {
      if (props.updated) {
        UpdateFunction(props.updated);
      }
    }, 4);
  }, []);

  return (
    <div className="k-line-chart-container">
      <div id="indicator-k-line" className="k-line-chart" />
      <div className="k-line-chart-menu-container"></div>
    </div>
  );
}
