import redbus from "../../assets/platforms/redbus.png";
import abhibus from "../../assets/platforms/abhibus.png";
import makemy from "../../assets/platforms/makemytrip.png";
import goibibo from "../../assets/platforms/goibibo.png";
import clear from "../../assets/platforms/cleartrip.png";
import yatra from "../../assets/platforms/yatra.png";
import paytm from "../../assets/platforms/paytm.png";
import ixigo from "../../assets/platforms/ixigo.png";

const platformImages = (logo) => {
  if (logo === "Red bus") {
    return redbus;
  } else if (logo == "Abhi bus") {
    return abhibus;
  } else if (logo == "Makemytrip") {
    return makemy;
  } else if (logo == "GOIBIBO") {
    return goibibo;
  } else if (logo == "CLEAR TRIP") {
    return clear;
  } else if (logo == "Yatra") {
    return yatra;
  } else if (logo == "Paytm") {
    return paytm;
  } else if (logo == "ixigo") {
    return ixigo;
  }
};
export default platformImages;
