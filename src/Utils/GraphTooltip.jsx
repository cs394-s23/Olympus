import React from 'react';

const GraphTooltip = ({ active, payload, label, compare_bool }) => {
  console.log(payload);
  if (active && payload && payload.length) {
    return (
      <div>
        {compare_bool ?
          <div>
            {payload[0].dataKey === "e1rm" || payload[0].dataKey === "e1rm_friend" ?
              <div>
                {payload[0].dataKey === "e1rm" ?
                  <div>
                    <p className="label"> {`${label} `} Your E1RM: {`${payload[0].value}`} lbs</p>
                  </div>
                  :
                  <div>
                    <p className="label"> {`${label} `} Friend's E1RM: {`${payload[0].value}`} lbs</p>
                  </div>
                }
              </div>
              :
              <div>
                {payload[0].dataKey === "weight_friend" ?
                  <p className="label"> {`${label} `} Friend's Volume: {`${payload[0].value}`} lbs</p>
                  :
                  <div>
                    {payload[0].dataKey === "weight" ?
                      <div>
                        <p className="label"> {`${label} `} Your Volume: {`${payload[0].value}`} lbs</p>
                      </div>
                      :
                      null
                    }
                  </div>
                }
              </div>
            }
          </div>
          :
          <div>
            <div className="custom-tooltip">
              {payload[0].payload.e1rm != null ?
                <div>
                  <p className="label"> {`${label} `} E1RM: {`${payload[0].value}`} lbs</p>
                  <p className="label">{`${label} `} Top Set: {`${payload[1].value}`} lbs</p>
                  <p className="label">Reps: {`${payload[0].payload.reps}`} </p>
                </div>
                :
                <p className="label"> {`${label} `} Volume: {`${payload[0].value}`} lbs</p>
              }
              <p className="intro"></p>
              <p className="desc"></p>
            </div>
          </div>}
      </div>
    );
  }

  return null;
};

export default GraphTooltip;