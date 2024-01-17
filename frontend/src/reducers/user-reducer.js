const INITIAL_STATE = {
  user: {
    type: "",
    id: 0,
    nume: "",
    prenume: "",
    email: "",
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SAVE_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
