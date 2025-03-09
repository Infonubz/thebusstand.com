import React, { useState } from "react";
import { Slider, InputNumber, Row, Col, ConfigProvider, Rate } from "antd";
import { GoDash } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineCurrencyRupee } from "react-icons/md";

const RangeSlide = ({
  value,
  setValue,
  boolean,
  setBoolean,
  setPriceRange,
  priceRange,
  setBusFilterType,
}) => {
  const onSliderChange = (value) => {
    setValue(value);
    const [min, max] = value;
    setPriceRange({ min, max });
     // console.log(value, "Value");
    // setBusFilterType("pricefilter");
  };

  // const onInputChange = (index, newValue) => {
  //   const updatedValue = [...value];
  //   const numericValue = Number(newValue);
  //   if (numericValue >= 0 && numericValue <= 3000) {
  //     updatedValue[index] = numericValue;
  //     updatedValue.sort((a, b) => a - b);
  //     setValue(updatedValue);
  //     const [min, max] = updatedValue;
  //     setPriceRange({ min, max });
  //   }
  // };

  const [error, setError] = useState("");

  const onInputChange = (index, newValue) => {
    const updatedValue = [...value];

    let sanitizedValue = String(newValue).replace(/[^0-9]/g, "");

    let numericValue = Number(sanitizedValue);

    if (numericValue >= 0 && numericValue <= 10000) {
      if (index === 0) {
        if (numericValue <= updatedValue[1]) {
          updatedValue[index] = numericValue;
          setError("");
        } else {
          setError("Min value cannot be greater than max value.");
          return;
        }
      } else {
        if (numericValue >= updatedValue[0]) {
          updatedValue[index] = numericValue;
          setError("");
        } else {
          setError("Max value cannot be less than min value.");
          return;
        }
      }

      setValue(updatedValue);
      const [min, max] = updatedValue;
      setPriceRange({ min, max });
    }
  };

  const handleInputChange = (index, event) => {
    const newValue = event.target.value;
    onInputChange(index, newValue);
  };

  const priceclear = () => {
    setValue([0, 10000]);
    setPriceRange({ min: 0, max: 10000 });
  };

  const formatValue = (value) => `₹${value}`;

  const handleMinKeyDown = (event) => {
    if (error && event.key !== "Backspace") {
      event.preventDefault();
      return;
    }
    const isControlKey = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ].includes(event.key);
    if (isControlKey) {
      return;
    }
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleKeyDown = (event) => {
    const isControlKey = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ].includes(event.key);
    if (isControlKey) {
      return;
    }
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  };

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
        <div className="px-[0.6vw] relative">
          <div className="grid grid-cols-4 justify-between items-center">
            <div className="col-span-3">
              <h1 className="text-[4.5vw] md:text-[1.1vw] font-bold md:pt-[0.3vw]">
                Price Range
              </h1>
            </div>
            <div className="flex items-center">
              <h3
                className="text-[3.5vw] md:text-[0.8vw] pr-[0.4vw] pl-[0.3vw] float-end text-gray-500 cursor-pointer"
                onClick={priceclear}
              >
                CLEAR
              </h3>
              {boolean?.price === true ? (
                <button
                  onClick={() =>
                    setBoolean({
                      ...boolean,
                      price: !boolean?.price,
                    })
                  }
                >
                  <IoIosArrowUp
                    size={"1vw"}
                    className="cursor-pointer md:block hidden"
                  />
                  <IoIosArrowUp
                    size={"4vw"}
                    className="cursor-pointer block md:hidden"
                  />
                </button>
              ) : (
                <span className="">
                  <IoIosArrowDown
                    size={"1vw"}
                    className="cursor-pointer md:block hidden"
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        price: !boolean?.price,
                      })
                    }
                  />
                  <IoIosArrowDown
                    size={"5vw"}
                    className="cursor-pointer block md:hidden"
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        price: !boolean?.price,
                      })
                    }
                  />
                </span>
              )}
            </div>
          </div>
          {boolean?.price && (
            <>
              <Row gutter={16} align="middle">
                <div className="flex justify-between  w-full">
                  <div className="">
                    <Col
                      span={12}
                      className="md:text-[1.2vw] text-[4vw] pt-[4vw] md:pt-[0vw]"
                      style={{ marginTop: "1vw" }}
                    >
                      {`₹${value[0]}`}
                    </Col>
                  </div>
                  <div>
                    <Col
                      span={12}
                      className="md:text-[1.2vw] text-[4vw] pt-[4vw] md:pt-[0vw]"
                      style={{ marginTop: "1vw" }}
                    >
                      {`₹${value[1]}`}
                    </Col>
                  </div>
                </div>
                <Col span={24} className="md:text-[1.2vw] text-[3vw]">
                  <Slider
                    range
                    min={0}
                    max={10000}
                    value={value}
                    className="ml-[4vw] mr-[4vw] md:ml-[1vw] md:mr-[1vw]"
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
                  />
                </Col>
                <div className="flex w-full items-center justify-evenly md:justify-center mb-[4vw] md:mb-[1vw] ">
                  <div>
                    <Col>
                      <p className="text-[3.5vw] md:text-[1.1vw] text-[#444444]">
                        Min. Price
                      </p>
                      <InputNumber
                        min={0}
                        max={10000}
                        autoComplete="off"
                        value={value[0]}
                        prefix={
                          <MdOutlineCurrencyRupee className="text-[4vw] text-black md:text-[1.25vw]" />
                        }
                        onChange={(val) =>
                          handleInputChange(0, { target: { value: val } })
                        }
                        onKeyDown={handleMinKeyDown}
                        // formatter={(value) => `₹${value}`}
                        parser={(value) => value.replace(/[^\d]/g, "")}
                        className="h-[8.5vw] w-[20vw] md:h-[2.6vw] md:w-[7vw] text-[4vw] md:text-[1.2vw]"
                        disabled={value[1] === 0}
                      />
                    </Col>
                  </div>
                  <div className="mt-[4vw] md:mt-[1.5vw]">
                    <GoDash
                      className="md:block hidden"
                      size="1.2vw"
                      color="#9B9B9B"
                    />
                    <GoDash
                      className="block md:hidden"
                      size="5vw"
                      color="#9B9B9B"
                    />
                  </div>
                  <div>
                    <Col>
                      <p className="text-[3.5vw] md:text-[1.1vw] text-[#444444]">
                        Max. Price
                      </p>
                      <InputNumber
                        min={0}
                        max={10000}
                        prefix={
                          <MdOutlineCurrencyRupee className="text-[4vw] text-black md:text-[1.25vw]" />
                        }
                        value={value[1]}
                        placeholder="0"
                        autoComplete="off"
                        className="h-[8.5vw] w-[20vw] md:h-[2.6vw] md:w-[7vw] text-[4vw] md:text-[1.2vw]"
                        onChange={(val) =>
                          handleInputChange(1, { target: { value: val } })
                        }
                        onKeyDown={handleKeyDown}
                        // formatter={(value) => `₹${value}`}
                        style={{
                          color: "#9B9B9B",
                        }}
                      />
                    </Col>
                  </div>
                </div>
              </Row>

              {error && (
                <div className="md:text-[0.8vw] text-[3vw] text-red-500 absolute bottom-[-0.3vw]">
                  {error}
                </div>
              )}
            </>
          )}
        </div>
      </ConfigProvider>
    </>
  );
};

export default RangeSlide;
