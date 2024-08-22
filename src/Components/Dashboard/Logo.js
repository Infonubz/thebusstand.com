import redbus from "../../assets/redbus.png";
import yatra from "../../assets/yatra.png";
import via from "../../assets/via.png";
import makemy from "../../assets/makemy.png";
import goibibo from "../../assets/go.png";
import zink from "../../assets/zink.png";
import orange from "../../assets/orange.png";
import clear from "../../assets/clear.png";
import paytm from "../../assets/paytm.png";
import ixigo from "../../assets/ixigo.jpg";
import abhibus from "../../assets/abhibus.png";
import Easymytrip from "../../assets/easemytrip.png";
const platformlogo = (logo) => {
  console.log(logo, "logologo");
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
  } else if (logo == "EaseMyTrip") {
    return Easymytrip;
  } else if (logo == "ixigo") {
    return ixigo;
  }
};
export default platformlogo;
