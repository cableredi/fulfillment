import config from "../config";
import TokenService from "./token-service";

const StatsApiService = {
  getAll() {
    return fetch(config.API_ENDPOINT_STATS + "/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getMaxDate(date) {
    return fetch(config.API_ENDPOINT_STATS + "/date", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  addStatistics(stats) {
    return fetch(config.API_ENDPOINT_STATS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(stats),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default StatsApiService;
