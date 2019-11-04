import { GET_MONITOR } from "../constants/action-types";

export function getMonitorData(payload) {
  return { type: GET_MONITOR, payload }
};
