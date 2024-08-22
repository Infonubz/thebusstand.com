const platformTheme = (seatplatform) => {
  console.log(seatplatform, "seatplatformseatplatform");
  if (seatplatform == "Red bus") {
    const color = {
      theme: "#D84E55",
      color: "#f1c0c3",
      btn: "#D84E55",
      gradient:"#f1c0c3"

    };
    // return "#C9323E";
    return color;
  } else if (seatplatform == "Abhi bus") {
    const color = {
      theme: "#C32629",
      color: "#f0c2c2",
      btn: "#C32629",
      gradient:"#f3bfc0"
    };
    // return "#DA000C";
    return color;
  } else if (seatplatform == "Makemytrip") {
    const color = {
      theme: "#216BC0",
      color: "#bdd7f4",
      btn: "#216BC0",
      gradient:"#bed7f4"
    };
    // return "#E31E25";
    return color;
  } else if (seatplatform == "GOIBIBO") {
    const color = {
      theme: "#FF6D38",
      color: "#ffc7b3",
      btn: "#FF6D38",
       gradient:"#ffc7b3"
    };
    // return "#F06739";
    return color;
  } else if (seatplatform == "CLEAR TRIP") {
    const color = {
      theme: "#FF4F17",
      color: "#ffc5b3",
      btn: "#FF4F17",
      gradient:"#ffc5b3"

    };
    // return "#FF4F17";
    return color;
  } else if (seatplatform == "Yatra") {
    const color = {
      theme: "#E93036",
      color: "#f1c1cb",
      btn: "#F34F4F",
      gradient:"#f8babc"

    };
    // return "#EA222F";
    return color;
  } else if (seatplatform == "Paytm") {
    const color = {
      theme: "#00B8F5",
      color: "#b3ecff",
      btn: "#00B8F5",
      gradient:"#b3ecff"

    };
    // return "#0DBBEF";
    return color;
  } else if (seatplatform == "ixigo") {
    const color = {
      theme: "#FF4E01",
      color: "#ebc7cb",
      btn: "#FF4E01",
      gradient:"#ffcab3"

    };
    // return "#ED5A24";
    return color;
  } else if (seatplatform == "EasyMyTrip") {
    const color = {
      theme: "#3183ED",
      color: "#c1d9f9",
      btn: "#3183ED",
      gradient:"#b9d5f9"
    };
    // return "#ED5A24";
    return color;
  } else {
    const color = {
      theme: "#1F487C",
      color: "#c2d6f0",
      btn: "#1F487C",
      gradient:"#c2d6f0"

    };
    // return "#1F487C";
    return color;
  }
};
export default platformTheme;
