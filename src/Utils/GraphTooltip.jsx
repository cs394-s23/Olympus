import React from 'react';

const GraphTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          {payload[0].payload.e1rm != null? 
          <div>
            <p className="label"> {`${label} `} E1RM: {`${payload[0].value}`} lbs</p>
            <p className="label">{`${label} `} Top Set: {`${payload[1].value}`} lbs</p>
          </div>
          : 
          <p className="label"> {`${label} `} Volume: {`${payload[0].value}`} lbs</p>
          }
          <p className="intro"></p>
          <p className="desc"></p>
        </div>
      );
    }
  
    return null;
  };
  
  export default GraphTooltip;