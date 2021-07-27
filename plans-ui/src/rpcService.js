import {Client as WebSocket} from 'rpc-websockets';

const getRPCService = () => {
  let ws = null;

  return {
    initiate: (onSuccess, onError) => {
      ws = new WebSocket(process.env.REACT_APP_WS_URL);
      ws.on('open', () => {
        ws
          .call('signin', [process.env.REACT_APP_EMAIL, process.env.REACT_APP_PASSWORD])
          .then(({token}) => onSuccess(token))
          .catch(onError);
      });
    },
    downloadPlans: (token, onSuccess, onError) => {
      ws.call('downloadPlans', [token]).then(onSuccess).catch(onError);
    },
    medicationTaken: (id, onSuccess) => {
      ws.call('medicationTaken', [id]).then(() => onSuccess(id));
    },
    medicationNotTaken: (id, onSuccess) => {
      ws.call('medicationNotTaken', [id]).then(() => onSuccess(id));
    },
  };
};

export default getRPCService;
