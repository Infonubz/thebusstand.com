import React, { useEffect } from "react";
import { Abhibus_GetOperators } from "../../../../Api-Abhibus/Home/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";
import { GetTBSOperators } from "../../../../Api-TBS/Home/Home";

export default function Private_Operators() {
  const Get_Operators = useSelector((state) => state.get_operators);
  const colors = useSelector((state) => state.themecolors[0]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Abhibus_GetOperators(dispatch);
    GetTBSOperators(dispatch);
  }, []);

   // console.log(Get_Operators, "Operators");

  return (
    <div className="px-[6.7vw] py-[1.5vw]">
      <div className=" w-full flex items-center justify-between ">
        <p
          className={`md:text-[1.5vw] text-[5vw] text-[${colors.primary}] font-bold`}
        >
          {`${Get_Operators?.length}+ Private Bus Operators`}
        </p>
        {Get_Operators?.length > 60 && (
          <Link to="/BusOperators">
            <button
              className={`text-[3vw] px-[2vw] py-[2vw] md:border-[0.1vw] md:border-[#AAAAAA] md:px-[1.5vw] md:py-[0.2vw] md:rounded-full md:text-[1vw] md:bg-white md:shadow-lg `}
            >
              View All
            </button>
          </Link>
        )}
      </div>
      <div className="grid md:grid-cols-6 grid-cols-3 w-full my-[1.5vw]">
        {Get_Operators?.length > 0 &&
          Get_Operators?.slice(0, 60).map((operator, index) => (
            <div key={index} className="col-span-1 w-full py-[0.3vw]">
              <p className="md:text-[1vw] text-[2.8vw] uppercase">
                {operator?.operater_name?.length > 19 ? (
                  <Tooltip
                    placement="top"
                    title={operator?.operater_name}
                    className="cursor-pointer"
                    color="#1F487C"
                  >
                    {`${operator.operater_name.slice(0, 19)}...`}
                  </Tooltip>
                ) : (
                  operator?.operater_name.slice(0, 18)
                )}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
