import { ComposedChart, AreaChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import GraphTooltip from './GraphTooltip';

function CreateGraph({ points, dashboardType, compareBool }) {
  return (
    // <ResponsiveContainer id="graph-container">
      <ComposedChart
        width={800}
        height={500}
        data={points}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date_string" scale="point"/>
        <YAxis domain={[dataMin => ((dataMin * 0.9).toFixed(2)), dataMax => ((dataMax * 1.1).toFixed(2))]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<GraphTooltip />} wrapperStyle={{ backgroundColor: "transparent", fontWeight: "bold" }} />
        <Line connectNulls={true} isAnimationActive={true} type="monotone" dataKey="e1rm" stroke="#84d896" activeDot={{ r: 8 }} strokeDasharray="5 5" strokeWidth={3} name="Expected 1RM" legendType={dashboardType === "1RM" ? "line" : "none"}/>
        <Line connectNulls={true} isAnimationActive={true} type="monotone" dataKey="weight" stroke="#e3e046" activeDot={{ r: 8 }} strokeWidth={3} name={dashboardType === "1RM" ? "Top Set" : "Total Volume"}/>
        <Area connectNulls={true} isAnimationActive={true} type="monotone" dataKey="e1rm" stroke="#84d896" fillOpacity={0.5} fill="#84d896" legendType='none' />
        <Area connectNulls={true} isAnimationActive={true} type="monotone" dataKey="weight" stroke="#e3e046" fillOpacity={0.5} fill="#e3e046" legendType='none' />
          
        <Legend />
      </ComposedChart>
    // </ResponsiveContainer>
  )
}
export default CreateGraph;