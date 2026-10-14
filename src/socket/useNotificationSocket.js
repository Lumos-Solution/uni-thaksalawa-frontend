import { useEffect } from 'react';
import { socket } from './socket';

export const useNotificationSocket = ({ onJoinRequest, onRequestDecided, enabled = true }) => {
    useEffect(() => {
        if (!enabled) return;

        // socket.active is true while connected or still trying to connect.
        if (!socket.active) socket.connect();

        if (onJoinRequest) socket.on('join-request', onJoinRequest);
        if (onRequestDecided) socket.on('request-decided', onRequestDecided);

        return () => {
            if (onJoinRequest) socket.off('join-request', onJoinRequest);
            if (onRequestDecided) socket.off('request-decided', onRequestDecided);
        };
    }, [enabled, onJoinRequest, onRequestDecided]);
};