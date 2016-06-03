"use strict";

import wrapper    from "../constants/wrapper";

// Local actions
const actions = [];

// Actions that make an api request
const requests = [
  "ADD_MESSAGE",
  "REMOVE_MESSAGE",
  "CLEAR_MESSAGES"
];

export const Constants = wrapper(actions, requests);

export const addMessage = (message) => ({
    type: Constants.ADD_MESSAGE,
    data: message
})

export const removeMessage = (message) => ({
  type: Constants.REMOVE_MESSAGE,
  data: message
});

export const clearMessages = () => ({type:Constants.CLEAR_MESSAGES})
