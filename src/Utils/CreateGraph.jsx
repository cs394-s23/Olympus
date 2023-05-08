import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CreateGraph({ points }) {
  return (
    <LineChart 
    width={500} 
    height={300} 
    data={points}
    margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
    >
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  )
}
  export default CreateGraph;