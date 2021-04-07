// const isState = {
//   user: [],
//   data: [],
// };

// const reducer = (state = isState, action) => {
//   if (action.type === "CHANGE_USER") {
//     return {
//       ...state,
//       user: [action.payload],
//     };
//   }
//   if (action.type === "CHANGE_DATA") {
//     return {
//       ...state,
//       data: [action.payload],
//     };
//   }
//   return state;
// };

// export default reducer;


export const initialState = null;

export const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  if (action.type === "CLEAR") {
    return null;
  }
  return state;
};
