import * as d3 from 'd3';
import { AxisLeft } from './axis-left';
import { AxisBottom } from './axis-bottom';

const data = [{ x: 2, y: 4, }, { x: 3, y: 5, }, { x: 1, y: 2, }, { x: 5, y: 5, }, { x: 7, y: 8, }, { x: 9, y: 9, }, { x: 6, y: 8, }, { x: 5, y: 4, }, { x: 7, y: 5, }, { x: 8, y: 9, }, { x: 6, y: 9, }, { x: 3, y: 6, }, { x: 2, y: 1, } ];
const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

type ScatterplotProps = {
  width: number;
  height: number;
  data: { x: number; y: number }[];
};

export const Scatterplot = ({ width, height, data }: ScatterplotProps) => {
  // Layout. The div size is set by the given props.
  // The bounds (=area inside the axis) is calculated by substracting the margins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Scales
  const yScale = d3.scaleLinear().domain([0, 10]).range([boundsHeight, 0]);
  const xScale = d3.scaleLinear().domain([0, 10]).range([0, boundsWidth]);

  // Build the shapes
  const allShapes = data.map((d, i) => {
    return (
      <circle
        key={i}
        r={3}
        cx={xScale(d.y)}
        cy={yScale(d.x)}
        opacity={1}
        stroke="#000000"
        fill="#000000"
        fillOpacity={0.2}
        strokeWidth={1}
      />
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
        >
          {/* Y axis */}
          <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />

          {/* X axis, use an additional translation to appear at the bottom */}
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={40}
              height={boundsHeight}
            />
          </g>

          {/* Circles */}
          {allShapes}
        </g>
      </svg>
    </div>
  );
};
