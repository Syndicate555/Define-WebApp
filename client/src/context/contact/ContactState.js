import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
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
  CLEAR_CHALLENGES,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Challenge
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({ type: GET_CHALLENGES, payload: res.data });
    } catch (err) {
      dispatch({ type: CHALLENGE_ERROR, payload: err.response.msg });
    }
  };

  // Add Challenge
  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({ type: ADD_CHALLENGE, payload: res.data });
    } catch (err) {
      dispatch({ type: CHALLENGE_ERROR, payload: err.response.msg });
    }
  };

  // Delete Challenge

  const deleteContact = (id) => {
    dispatch({ type: DELETE_CHALLENGE, payload: id });
  };
  // Set Current Challenge
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear Current Challenge
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  // Update Challenge
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CHALLENGE, payload: contact });
  };
  // Filter Challenge

  const filterContacts = (text) => {
    dispatch({ type: FILTER_CHALLENGE, payload: text });
  };
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
