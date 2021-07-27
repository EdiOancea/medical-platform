import { w3cwebsocket as W3CWebSocket } from 'websocket';

let client = null;

export const subscribeToPatientsActivities = (
  patientIds = [],
  handleMessage = () => {},
) => {
  client = new W3CWebSocket(process.env.REACT_APP_WS_URL, '');

  client.onerror = () => {
    console.log('Connection Error');
    client = null;
  };

  client.onopen = () => {
    console.log('WebSocket Client Connected');
    patientIds.forEach(addPatientToSubscription);
  };

  client.onclose = () => {
    console.log('Client Closed');
    patientIds.forEach(removePatientFromSubscription);
  }

  client.onmessage = e => handleMessage(JSON.parse(e.data));
};

export const unsubscribeFromPatientsActivities = () => {
  if (client) {
    client.close();
  }
};

export const addPatientToSubscription = patientId => {
  if (client) {
    client.send(JSON.stringify({ command: 'ADD', patientId, }));
  }
};

export const removePatientFromSubscription = patientId => {
  if (client) {
    client.send(JSON.stringify({ command: 'REMOVE', patientId }));
  }
};
