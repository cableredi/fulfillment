import React, { createContext, useReducer } from "react";
import StatsReducer from "./StatsReducer";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [pick_stats, dispatchPickStats] = useReducer(StatsReducer, []);
  const [pack_stats, dispatchPackStats] = useReducer(StatsReducer, []);
  const [opu_stats, dispatchOpuStats] = useReducer(StatsReducer, []);

  const setPickStats = (stats) => {
    dispatchPickStats({
      type: "SET_PICK_STATS",
      payload: stats,
    });
  };


  const updatePickStat = (selectedStat) => {
    dispatchPickStats({
      type: "UPDATE_PICK_STAT",
      payload: selectedStat,
    });
  };

  const setPackStats = (stats) => {
    dispatchPackStats({
      type: "SET_PACK_STATS",
      payload: stats,
    });
  };

  const updatePackStat = (selectedStat) => {
    dispatchPackStats({
      type: "UPDATE_PACK_STAT",
      payload: selectedStat,
    });
  };  

  const setOpuStats = (stats) => {
    dispatchOpuStats({
      type: "SET_OPU_STATS",
      payload: stats,
    });
  };

  const updateOpuStat = (selectedStat) => {
    dispatchOpuStats({
      type: "UPDATE_OPU_STAT",
      payload: selectedStat,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        pick_stats: pick_stats,
        setPickStats,
        updatePickStat,

        pack_stats: pack_stats,
        setPackStats,
        updatePackStat,

        opu_stats: opu_stats,
        setOpuStats,
        updateOpuStat,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
