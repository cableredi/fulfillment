import config from "../config";
import TokenService from "./token-service";

const ProductsApiService = {
  getAllPick() {
    return fetch(config.API_ENDPOINT_STATS + "/pick", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getAllPack() {
    return fetch(config.API_ENDPOINT_STATS + "/pack", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getAllOpu() {
    return fetch(config.API_ENDPOINT_STATS + "/opu", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default ProductsApiService;
