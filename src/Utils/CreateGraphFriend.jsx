import { ComposedChart, AreaChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import GraphTooltip from './GraphTooltip';

function CreateGraphFriend({ points, dashboardType, compareBool }) {
  return (
    <ResponsiveContainer width={800} height={500} id="graph-container">
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
        <XAxis dataKey="date_string" />
        <YAxis domain={[dataMin => ((dataMin * 0.9).toFixed(2)), dataMax => ((dataMax * 1.1).toFixed(2))]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<GraphTooltip compare_bool={compareBool}/>} wrapperStyle={{ backgroundColor: "transparent", fontWeight: "bold" }} />

            <Line connectNulls={true} isAnimationActive={true} type="monotone" dataKey={dashboardType === "1RM" ? "e1rm" : "weight"} stroke="#84d896" activeDot={{ r: 1 }}  strokeWidth={3} name={dashboardType === "1RM" ? "Your Expected 1RM" : "Your Total Volume"}/>,
            <Line connectNulls={true} isAnimationActive={true} type="monotone" dataKey={dashboardType === "1RM" ? "e1rm_friend" : "weight_friend"} stroke="#4b58ea" activeDot={{ r: 1 }} strokeWidth={3} name={dashboardType === "1RM" ? "Friend's Expected 1RM" : "Friend's Total Volume"}/>,
            {/* <Area connectNulls={true} isAnimationActive={true} type="monotone" dataKey={dashboardType === "1RM" ? "e1rm" : "weight"} stroke="#84d896" fillOpacity={0.5} fill="#84d896" legendType='none' />, */}
            {/* <Area connectNulls={true} isAnimationActive={true} type="monotone" dataKey={dashboardType === "1RM" ? "e1rm_friend" : "weight_friend"} stroke="#4b58ea" fillOpacity={0.5} fill="#4b58ea" legendType='none' /> */}
        <Legend />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
export default CreateGraphFriend;