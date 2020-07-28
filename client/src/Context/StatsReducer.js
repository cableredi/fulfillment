export default (state, action) => {
  switch (action.type) {
    case "SET_STATS":
      return action.payload;

    case "ADD_STAT":
      return [...state, action.payload];

    default:
      return state;
  }
};
