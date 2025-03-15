import { format } from "date-fns";
import { ScaleLinear } from "d3";
import { useMemo } from "react";
import * as d3 from "d3";

const TICK_LENGTH = 4;

type DataPoint = {
  date: string;
  price: number;
};

type DataPointExpanded = {
  price: number;
  date: Date;
  movingAverage: number;
};

export const Graph = (
  { width, height, data, startDate, endDate, tickCount, pointStroke, pointFill }: {
    width: number;
    height: number;
    data: DataPoint[];
    startDate: Date;
    endDate: Date;
    tickCount: number;
    pointStroke?: string;
    pointFill?: string;
  },
) => {
  const dataProcessed = computeMovingAverage(data);

  const minPrice = Math.min(...dataProcessed.map((x) => x.price));
  const maxPrice = Math.max(...dataProcessed.map((x) => x.price));

  const graphPriceMin = minPrice - ((maxPrice - minPrice) * 0.5); // moves the data towards the center of the graph
  const graphPriceMax = maxPrice + ((maxPrice - minPrice) * 0.5);

  // d3 scales
  const yScale = d3.scaleLinear([graphPriceMin, graphPriceMax], [height, 0]);
  const xScale = d3.scaleTime([startDate, endDate], [0, width]);

  // Points
  const points = dataProcessed.map((d, i) => {
    return (
      <circle
        key={i}
        r={3}
        cx={xScale(d.date)}
        cy={yScale(d.price)}
        stroke={pointStroke}
        fill={pointFill}
        strokeWidth={1}
      />
    );
  });

  // Line for moving average
  const lineBuilder = d3
    .line<DataPoint>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.movingAverage))
    .curve(d3.curveCatmullRom.alpha(0.5)); // smooth and fancy

  const linePath = lineBuilder(dataProcessed);

  return (
    <svg width={width} height={height}>
      <g width={width} height={height} >
        {/* x axis */}
        <AxisLeft yScale={yScale} pixelsPerTick={49} width={width} />

        {/* x axis*/}
        <g transform={`translate(0, ${height - 20})`}>
          <AxisBottom xScale={xScale} tickCount={tickCount} />
        </g>

        {/* the points */}
        {points}

        {/* ma curve */}
        <path d={linePath} opacity={0.8} stroke="black" fill="none" strokeWidth={2} />
      </g>
    </svg>
  );
};

// component for the x axis
const AxisBottom = ({
  xScale,
  tickCount,
}: {
  xScale: ScaleLinear<number, number>;
  tickCount: number;
}) => {
  const range = xScale.range();
  const width = range[1] - range[0];

  const ticks = useMemo(() => {
    return xScale.ticks(tickCount).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [xScale, tickCount]);

  return (
    <>
      <line y1={0} y2={0} x1={0} x2={width} stroke="#D2D7D3" strokeWidth={0.5} shapeRendering={"crispEdges"} />
      {/* Ticks and labels */}
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>

          <line y1={0} y2={TICK_LENGTH} stroke="#D2D7D3" strokeWidth={0.5} shapeRendering={"crispEdges"} />

          <text key={value} style={{ textAnchor: "middle", transform: "translateY(20px)", opacity: 0.5 }} >
            {format(value as Date, "d/MM")}
          </text>
        </g>
      ))}
    </>
  );
};

// component for the y axis
const AxisLeft = ({ yScale, pixelsPerTick, width }: {
  yScale: ScaleLinear<number, number>;
  pixelsPerTick: number;
  width: number;
}) => {
  const range = yScale.range();

  const ticks = useMemo(() => {
    const height = range[0] - range[1];
    const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

    return yScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale]);

  return (
    <>
      {/* Ticks and labels */}
      {ticks.map(({ value, yOffset }) => (
        <g key={value} transform={`translate(0, ${yOffset})`}> 
          <line x1={0} x2={width} stroke="#D2D7D3" strokeWidth={0.5} shapeRendering={"crispEdges"} /> 
          <text key={value} style={{ textAnchor: "start", transform: "translateY(-5px)", opacity: 0.5 }} >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};

const computeMovingAverage = (
  data: DataPoint[],
  windowSize = 5, // 5 data point moving average
): DataPointExpanded[] => {
  return data.map((point, index) => {
    const start = Math.max(0, index - windowSize + 1);
    const subset = data.slice(start, index + 1);
    const average = subset.reduce((sum, p) => sum + p.price, 0) / subset.length;
    return {
      price: point.price,
      date: new Date(point.date),
      movingAverage: average,
    };
  });
};
