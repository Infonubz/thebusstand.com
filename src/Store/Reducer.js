import {
  GET_BUS_LIST,
  GET_STATIONS,
  HOME_SELECTED_DATE,
  SEND_OTP,
  PDP,
  GET_OPERATORS,
  GET_THEME_COLORS,
  DISCOUNT_OFFER_LIST,
  PROMOTION_LIST,
  TOP_ROUTE_LIST,
  GET_OPERATOR_LIST,
  FAQS,
  FAQ_LIST,
  TBS_INFO,
  FEED_BACK,
  FOOTER,
  SEND_APP_LINK,
  OFFERS_OCCUPATION,
  BUSLIST_LOADER,
  GET_BUS_FILTERS,
  PASSENGER_DATA,
  PROFILE_DATA,
  MOB_ADS_LIST,
  ADS_LIST,
  GET_DES_STATION,
  GET_TICKET_DETAILS,
  CURRENT_PERCENTAGE,
  BOOKING_DETAILS_STATUS,
} from "./Type";

const initial = {
  send_otp: [],
  get_stations: [],
  selected_date: "",
  get_buslist: [],
  get_operators: [],
  themecolors: [
    {
      primary: "#1F487C",
      background: "#E5FFF1",
    },
  ],
  promo_list: [],
  discount_offer_list: [],
  top_route_list: [],
  footer: [],
  send_app_link: [],
  faqs: [],
  faq_list: [],
  feed_back: [],
  tbs_info: [],
  get_operator_list: [],
  buslist_loader: false,
  get_buslist_filter: [],
  profile_data: [],
  passenger_data: [],
  ads_list: [],
  mob_ads_list: [],
  get_des_station: [],
  get_ticket_detail: [],
  live_per: [],
  booking_details: [],
};
export const busreducer = (state = initial, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEND_OTP: {
      return {
        ...state,
        send_otp: payload,
      };
    }
    case GET_STATIONS: {
      return {
        ...state,
        get_stations: payload,
      };
    }
    case HOME_SELECTED_DATE: {
      return {
        ...state,
        selected_date: payload,
      };
    }
    case GET_BUS_LIST: {
      return {
        ...state,
        get_buslist: payload,
      };
    }
    case GET_OPERATORS: {
      return {
        ...state,
        get_operators: payload,
      };
    }
    case GET_THEME_COLORS: {
      return {
        ...state,
        get_colors: [...state.themecolors, payload],
      };
    }
    case DISCOUNT_OFFER_LIST: {
      return {
        ...state,
        discount_offer_list: payload,
      };
    }
    case PROMOTION_LIST: {
      return {
        ...state,
        promo_list: payload,
      };
    }
    case TOP_ROUTE_LIST: {
      return {
        ...state,
        top_route_list: payload,
      };
    }
    case PDP: {
      return {
        ...state,
        pdp: payload,
      };
    }

    case FEED_BACK: {
      return {
        ...state,
        feed_back: payload,
      };
    }

    case FOOTER: {
      return {
        ...state,
        footer: payload,
      };
    }
    case SEND_APP_LINK: {
      return {
        ...state,
        send_app_link: payload,
      };
    }
    case FAQS: {
      return {
        ...state,
        faqs: payload,
      };
    }
    case FAQ_LIST: {
      return {
        ...state,
        faq_list: payload,
      };
    }
    case TBS_INFO: {
      return {
        ...state,
        tbs_info: payload,
      };
    }
    case GET_OPERATOR_LIST: {
      return {
        ...state,
        get_operator_list: payload,
      };
    }
    case OFFERS_OCCUPATION: {
      return {
        ...state,
        offers_occupation: payload,
      };
    }
    case BUSLIST_LOADER: {
      return {
        ...state,
        buslist_loader: payload,
      };
    }
    case GET_BUS_FILTERS: {
      return {
        ...state,
        get_buslist_filter: payload,
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

    case ADS_LIST: {
      return {
        ...state,
        ads_list: payload,
      };
    }
    case MOB_ADS_LIST: {
      return {
        ...state,
        mob_ads_list: payload,
      };
    }
    case GET_DES_STATION: {
      return {
        ...state,
        get_des_station: payload,
      };
    }
    case GET_TICKET_DETAILS: {
      return {
        ...state,
        get_ticket_detail: payload,
      };
    }
    case CURRENT_PERCENTAGE: {
      return {
        ...state,
        live_per: payload?.data?.data?.[0].Percentage,
      };
    }
    case BOOKING_DETAILS_STATUS: {
      return {
        ...state,
        booking_details: payload,
      };
    }
    default: {
      return state;
    }
  }
};
