import {
  GET_CHALLENGES,
  ADD_CHALLENGE,
  DELETE_CHALLENGE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CHALLENGE,
  FILTER_CHALLENGE,
  CLEAR_FILTER,
  CHALLENGE_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CHALLENGES:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case ADD_CHALLENGE:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        loading: false,
      };
    case UPDATE_CHALLENGE:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        loading: false,
      };
    case DELETE_CHALLENGE:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_CHALLENGE:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return contact.name.match(regex) || contact.type.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case CHALLENGE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
