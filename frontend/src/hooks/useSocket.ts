import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { user, accessToken } = useAuthStore();

  useEffect(() => {
    if (user && accessToken) {
      socketRef.current = io('/', {
        auth: {
          token: accessToken
        }
      });

      socketRef.current.on('connect', () => {
        console.log('Connected to socket');
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [user, accessToken]);

  return socketRef.current;
};
