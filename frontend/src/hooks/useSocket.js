import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://192.168.0.9:5001");

function useSocket() {
  const [data, setData] = useState(null);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    event && socket.on(event, (data) => setData(data));
  }, [event]);

  const subscribe = (id) => setEvent(id.toLowerCase());

  return [data, subscribe];
}

export default useSocket;
