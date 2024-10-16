// socketService.js

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL;

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Create the socket instance
    const socket = io(SOCKET_URL, {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttempts: 10,
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
    });

    setSocket(socket);

    return () => {
      socket.disconnect(); // Cleanup on unmount
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
