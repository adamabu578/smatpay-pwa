const BASE_URL = process.env.NODE_ENV === "development" ? "/api" : "https://api.smatpay.com.ng";

export const APIConstants = {
  BASE_URL,
  profileEndpoint: `${BASE_URL}/profile`,
  virtualAccountEndpoint: `${BASE_URL}/virtual-account`,
};
