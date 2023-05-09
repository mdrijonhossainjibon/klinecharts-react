import Indicator from "./chart/Indicator";

import "./app.css";
import JSON from "./data.json";
function App() {
  const data = JSON.map((i) => {
    return {
      open: i[1],
      close: i[4],
      high: i[2],
      low: i[3],
      timestamp: i[0],
      volume: i[7],
    };
  });

  return (
    <div className="app">
      <Indicator intialldata={data.slice(0, 4)} />
    </div>
  );
}

export default App;
