import { createContext, useReducer } from "react";

export const LogsContext = createContext();

export const logsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOGS':
      return {
        logs: action.payload
      };
    case 'CREATE_LOG':
      return {
        logs: [action.payload, ...state.logs]
      };
    case 'DELETE_LOG':
      return {
        logs: state.logs.filter((x) => x._id !== action.payload._id)
      };
    case 'UPDATE_LOG':
      const updatedLogs = state.logs.map(log => {
        if (log._id === action.payload._id) {
          return {
            ...log,
            student: action.payload.student,
            questions: action.payload.questions,
            // You may want to update other fields here as well
          };
        } else {
          return log;
        }
      });

      return {
        logs: updatedLogs
      };
    default:
      return state;
  }
};

export const LogsContextProvider = (props) => {
  const [state, dispatch] = useReducer(logsReducer, {
    logs: null
  });

  return (
    <LogsContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </LogsContext.Provider>
  );
};
