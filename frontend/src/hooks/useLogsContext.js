import { LogsContext } from "../context/LogContext";
import { useContext } from "react";

export const useLogsContext = () => {
    const context = useContext(LogsContext);

    if(!context) {
        throw Error('useLogsContext must be used inside a ')
    }

    return context;
}