export const handleActionExists = (type, key, value) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  const message = [value] + "Message";

  return (state, action) => {
    switch (action.type) {
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            exists: {
              ...state[key].exists,
              [value]: true,
              [message]: "",
            },
          },
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            exists: {
              ...state[key].exists,
              [value]: false,
              [message]: action.payload,
            },
          },
        };
      default:
        return state;
    }
  };
};
