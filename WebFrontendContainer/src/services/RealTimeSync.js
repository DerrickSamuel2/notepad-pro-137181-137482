import ReconnectingWebSocket from "reconnecting-websocket";

/**
 * PUBLIC_INTERFACE
 * Sets up a real-time sync connection with backend (WebSocket).
 * @param {() => void} onMessage Callback for incoming message.
 * @returns {object} WebSocket connection instance.
 */
export function initRealTimeSync({ onMessage }) {
  const WS_URL = process.env.REACT_APP_WS_URL;
  const ws = new ReconnectingWebSocket(WS_URL);

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage?.(data);
    } catch (e) {
      // ignore
    }
  };

  ws.onerror = (err) => {
    // handle error/log
  };

  return ws;
}
