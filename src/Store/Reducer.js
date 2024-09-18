import {
  BUS_SEARCH,
  FILTER,
  SEARCH_BUTTON,
  BUS_DATAS,
  GET_DATA,
  BUS_LIST,
  GET_FILTER_DATA,
  SHARE_BUTTON,
  REARRANGE_ORDER,
  HOME_SELECTED_DATE,
  SEAT_TYPE,
  PROFILE_DATA,
  PASSENGER_DATA,
  FAQS,
  FOOTER,
  ADS_LIST,
  PROMOTION_LIST,
  CARD_DETAIL,
  TOP_ROUTE_LIST,
  PDP,
  OFFERS_OCCUPATION,
  SEAT_LAYOUT,
  GET_BOOKING_DETAILS,
  TBS_INFO,
  GET_OPERATOR_LIST,
  FEED_BACK,
  SEND_OTP,
  BOOKING_DETAILS_STATUS,
  GET_TICKET_TO_CANCEL,
} from "./type";

const initial = {
  bus_search: [],
  filter: {},
  search: false,
  bus_data: {},
  get_data: [],
  get_filter_data: [],
  share: false,
  rearrange: {},
  selected_date: "",
  seat_type: "",
  profile_data: [],
  passenger_data: [],
  faqs: [],
  footer: [],
  ads_list: [],
  promo_list: [],
  top_route_list: [],
  pdp: [],
  offers_occupation: [],
  seat_layout: [],
  get_booking_details: [],
  tbs_info: [],
  get_operator_list: [],
  feed_back: [],
  send_otp: [],
};

export const busreducer = (state = initial, action) => {
  const { type, payload } = action;
  switch (type) {
    case BUS_SEARCH: {
      return {
        ...state,
        bus_search: [...state.bus_search, payload],
      };
    }
    case FILTER: {
      return {
        ...state,
        filter: payload,
      };
    }
    case SEARCH_BUTTON: {
      return {
        ...state,
        search: payload,
      };
    }
    case BUS_DATAS: {
      return {
        ...state,
        bus_data: payload,
      };
    }
    case GET_DATA: {
      console.log(payload, "geting");
      return {
        ...state,
        get_data: payload,
      };
    }
    case BUS_LIST: {
      return {
        ...state,
        bus_list: payload,
      };
    }
    case GET_FILTER_DATA: {
      console.log(payload, "geting");
      return {
        ...state,
        get_filter_data: payload,
      };
    }
    case SHARE_BUTTON: {
      console.log(payload, "geting");
      return {
        ...state,
        share: payload,
      };
    }
    case REARRANGE_ORDER: {
      return {
        ...state,
        rearrange: payload,
      };
    }
    case HOME_SELECTED_DATE: {
      console.log(payload, "pyaloaddddd");
      return {
        ...state,
        selected_date: payload,
      };
    }
    case SEAT_TYPE: {
      console.log(payload, "dffdfefewfdfdfefefe");
      return {
        ...state,
        seat_type: payload,
      };
    }
    case PROFILE_DATA: {
      return {
        ...state,
        profile_data: payload,
      };
    }
    case PASSENGER_DATA: {
      return {
        ...state,
        passenger_data: payload,
      };
    }
    case FAQS: {
      return {
        ...state,
        faqs: payload,
      };
    }
    case FOOTER: {
      console.log(payload, "footerapisisfetchedsuccessfully");
      return {
        ...state,
        footer: payload,
      };
    }
    case ADS_LIST: {
      return {
        ...state,
        ads_list: payload,
      };
    }
    case PROMOTION_LIST: {
      return {
        ...state,
        promo_list: payload,
      };
    }
    case CARD_DETAIL: {
      console.log(payload, "carddetailsssssss");

      return {
        ...state,
        card_detail: payload,
      };
    }
    case TOP_ROUTE_LIST: {
      return {
        ...state,
        top_route_list: payload,
      };
    }
    case PDP: {
      console.log(payload, "p_d_p");
      return {
        ...state,
        pdp: payload,
      };
    }
    case OFFERS_OCCUPATION: {
      console.log(payload, "OFFERS_OCCUPATION");
      return {
        ...state,
        offers_occupation: payload,
      };
    }
    case SEAT_LAYOUT: {
      console.log(payload, "OFFERS_OCCUPATION");
      return {
        ...state,
        seat_layout: payload.data[0],
      };
    }
    case GET_BOOKING_DETAILS: {
      console.log(payload, "GET_BOOKING_DETAILS");
      return {
        ...state,
        get_booking_details: payload,
      };
    }
    case TBS_INFO: {
      console.log(payload, "TBS_INFO__TBS_INFO");
      return {
        ...state,
        tbs_info: payload,
      };
    }
    case GET_OPERATOR_LIST: {
      console.log(payload, "GET_OPERATOR_LIST");
      return {
        ...state,
        get_operator_list: payload,
      };
    }
    case FEED_BACK: {
      console.log(payload, "FEED_BACK__FEED_BACK");
      return {
        ...state,
        feed_back: payload,
      };
    }

    case SEND_OTP: {
      console.log(payload, "SEND_OTP");
      return {
        ...state,
        send_otp: payload,
      };
    }
    case BOOKING_DETAILS_STATUS: {
      return {
        ...state,
        booking_details_status: payload,
      };
    }
    case GET_TICKET_TO_CANCEL: {
      return {
        ...state,
        get_ticket_to_cancel: payload,
      };
    }

    default: {
      return state;
    }
  }
};
