import React from "react";

function BusTypes({ operators }) {
  return (
    <div>
      {operators.length > 0 &&
        operators.map((operator, index) => (
          <div key={index}>
            {Object.values(operator)[0].map((bus, busIndex) => (
              <p key={busIndex}>{bus[busIndex].Bus_operator_name}</p>
            ))}
          </div>
        ))}
    </div>
  );
}

export default BusTypes;
