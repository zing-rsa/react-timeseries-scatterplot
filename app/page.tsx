import { Scatterplot } from "./components/basic-scatter-plot/scatter-plot";
import { ScatterplotMa } from "./components/scatter-plot-ma/scatter-plot";

const scatterPlotData = [{ x: 2, y: 4, }, { x: 3, y: 5, }, { x: 1, y: 2, }, { x: 5, y: 5, }, { x: 7, y: 8, }, { x: 9, y: 9, }, { x: 6, y: 8, }, { x: 5, y: 4, }, { x: 7, y: 5, }, { x: 8, y: 9, }, { x: 6, y: 9, }, { x: 3, y: 6, }, { x: 2, y: 1, } ];

export default function Page() {
    return (
      <div>
        <div>
          <h1>Basic Scatter Plot</h1>
          <Scatterplot data={scatterPlotData} width={700} height={500} />
        </div>
        <div>
          <h1>Scatter Plot with ma</h1>
          <ScatterplotMa data={scatterPlotData} width={700} height={500} />
        </div>

      </div>
    )
  }