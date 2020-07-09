export default (state, action) => {
  switch (action.type) {
    case "SET_PICK_STATS":
      return action.payload;

    case "UPDATE_PICK_STAT":
      const updatedPickStat = action.payload;

      return state.map((stat) =>
        stat.stat_id !== updatedPickStat.stat_id ? stat : updatedPickStat
      );

    case "SET_PACK_STATS":
      return action.payload;

    case "UPDATE_PACK_STAT":
      const updatedPackStat = action.payload;

      return state.map((stat) =>
        stat.stat_id !== updatedPackStat.stat_id ? stat : updatedPackStat
      );

    case "SET_OPU_STATS":
      return action.payload;

    case "UPDATE_OPU_STAT":
      const updatedOpuStat = action.payload;

      return state.map((stat) =>
        stat.stat_id !== updatedOpuStat.stat_id ? stat : updatedOpuStat
      );

    default:
      return state;
  }
};
