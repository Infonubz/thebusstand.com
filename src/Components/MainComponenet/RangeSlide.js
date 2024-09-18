import React, { useState } from "react";
import { Slider, InputNumber, Row, Col, ConfigProvider } from "antd";
import { GoDash } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const RangeSlide = ({ value, setValue, boolean, setBoolean, setPriceRange, priceRange }) => {
  

  const onSliderChange = (value) => {
    setValue(value);
    const [min, max] = value;
    setPriceRange({ min, max });
    console.log(value, "Value");
  };

  const onInputChange = (index, newValue) => {
    const updatedValue = [...value];
    const numericValue = Number(newValue);
    if (numericValue >= 0 && numericValue <= 3000) {
      updatedValue[index] = numericValue;
      updatedValue.sort((a, b) => a - b);
      setValue(updatedValue);
      const [min, max] = updatedValue;
      setPriceRange({ min, max });
    }
  };

  const priceclear = () => {
    setValue([0, 3000]);
    setPriceRange([0, 3000]);
  };

  const formatValue = (value) => `₹${value}`;

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Slider: {
              dotBorderColor: "#1F487C",
              dotActiveBorderColor: "#1F487C",
              handleActiveColor: "#1F487C",
              handleColorDisabled: "#1F487C",
              handleActiveOutlineColor: "#1F487C",
              handleColor: "#1F487C",
            },
          },
        }}
      >
        <div className="px-[0.6vw]">
          <div className="grid grid-cols-4 justify-between items-center">
            <div className="col-span-3">
              <h1 className="text-[1.1vw] font-bold pt-[0.3vw]">Price Range</h1>
            </div>
            <div className="flex items-center">
              <h3
                className="text-[0.8vw] pr-[0.4vw] pl-[0.3vw] float-end text-gray-500 cursor-pointer"
                onClick={priceclear}
              >
                CLEAR
              </h3>
              {boolean.price == true ? (
                <button
                  onClick={() =>
                    setBoolean({
                      ...boolean,
                      price: !boolean.price,
                    })
                  }
                >
                  <IoIosArrowUp size={"1vw"} className="cursor-pointer" />
                </button>
              ) : (
                <IoIosArrowDown
                  size={"1vw"}
                  className="cursor-pointer"
                  onClick={() =>
                    setBoolean({
                      ...boolean,
                      price: !boolean.price,
                    })
                  }
                />
              )}
            </div>
          </div>
          {boolean.price && (
            <Row gutter={16} align="middle">
              <div className="flex justify-between  w-full">
                <div className="">
                  <Col
                    span={12}
                    style={{ marginTop: "1vw", fontSize: "1.2vw" }}
                  >
                    {`₹${value[0]}`}
                  </Col>
                </div>
                <div>
                  <Col
                    span={12}
                    style={{ marginTop: "1vw", fontSize: "1.2vw" }}
                  >
                    {`₹${value[1]}`}
                  </Col>
                </div>
              </div>
              <Col span={24} style={{ fontSize: "1.2vw" }}>
                <Slider
                  range
                  min={0}
                  max={3000}
                  value={value}
                  onChange={onSliderChange}
                  tooltip={{
                    formatter: formatValue,
                    placement: "top",
                  }}
                  trackStyle={[{ backgroundColor: "#1F487C" }]}
                  handleStyle={[
                    { borderColor: "#1F487C", backgroundColor: "#fff" },
                    { borderColor: "#1F487C", backgroundColor: "#fff" },
                  ]}

                  // theme={{
                  //     token: {
                  //         dotBorderColor: "black",
                  //         dotActiveBorderColor: "black"
                  //     }
                  // }}
                />
              </Col>
              <div className="flex w-full items-center justify-center">
                <div>
                  <Col>
                    <p className="text-[1.1vw] text-[#444444]">Min. Price</p>
                    <InputNumber
                      min={0}
                      max={3000}
                      value={value[0]}
                      onChange={(val) => onInputChange(0, val)}
                      formatter={(value) => `₹${value}`}
                      style={{
                        width: "100%",
                        color: "#FF0000",
                        fontSize: "1.2vw",
                      }}
                    />
                  </Col>
                </div>
                <div className="mt-[1.5vw]">
                  <GoDash size="1.2vw" color="#9B9B9B" />
                </div>
                <div>
                  <Col>
                    <p className="text-[1.1vw]  text-[#444444]">Max. Price</p>
                    <InputNumber
                      min={0}
                      max={3000}
                      value={value[1]}
                      onChange={(val) => onInputChange(1, val)}
                      formatter={(value) => `₹${value}`}
                      style={{
                        width: "100%",
                        color: "#9B9B9B",
                        fontSize: "1.2vw",
                      }}
                    />
                  </Col>
                </div>
              </div>
            </Row>
          )}
        </div>
      </ConfigProvider>
    </>
  );
};

export default RangeSlide;
