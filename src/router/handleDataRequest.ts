import { Serializable } from "child_process";

import { balancer } from "../balancer";
import { IS_MULTI, REQUESTS } from "../constants";


export const handleDataRequest = <T>(type: REQUESTS, callback: (data: T) => void, param?: Serializable) => {
  if (IS_MULTI) {
    balancer.sendMessage({ type, param });

    process.on('message', callback);
  } else {
    const data = balancer.storage?.storageRequests(type, param) as T;

    callback(data);
  }
};