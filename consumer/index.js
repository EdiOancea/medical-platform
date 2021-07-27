require('dotenv').config();
const amqp = require('amqplib');
const fetch = require('node-fetch');
const { wsServer } = require('./wsserver');

const R1 = 7 * 60 * 60;
const R2 = 5 * 60 * 60;
const R3 = 1 * 30 * 60;

const clients = {};

wsServer.on('request', request => {
  const wsConnection = request.accept('', request.origin);
  clients[request.key] = { patientIds: new Set(), wsConnection };

  wsConnection.on('message', message => {
    if (message.type !== 'utf8') {
      return;
    }

    const { patientId, command } = JSON.parse(message.utf8Data);

    if (command === 'ADD') {
      clients[request.key].patientIds.add(patientId);
    }

    if (command === 'REMOVE') {
      clients[request.key].patientIds.delete(patientId);
    }
  });

  wsConnection.on('close', (reasonCode, description) => {
    delete clients[request.key];
  });
});

amqp
  .connect(process.env.CLOUDAMQP_URL)
  .then(connection => connection.createChannel())
  .then(channel => {
    const queue = 'activities';

    return channel
      .assertQueue(queue, { durable: true })
      .then(() => channel.consume(
        queue,
        message => {
          const { activity, start, end, patientId } = JSON.parse(message.content.toString());
          const duration = end - start;

          fetch(`${process.env.REST_API_URL}monitoredActivities`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ patientId, activityName: activity, startTime: start, endTime: end }),
          });

          Object.values(clients).forEach(({ wsConnection, patientIds }) => {
            if (!patientIds.has(patientId)) {
              return;
            }

            if (activity === 'Sleeping' && duration > R1) {
              wsConnection.sendUTF(JSON.stringify({
                patientId,
                notification: 'has been sleeping too much',
              }));
            }

            if (activity === 'Leaving' && duration > R2) {
              wsConnection.sendUTF(JSON.stringify({
                patientId,
                notification: 'left the house for too long'
              }));
            }

            if (['Toileting', 'Showering', 'Grooming'].includes(activity) && duration > R3) {
              wsConnection.sendUTF(JSON.stringify({
                patientId,
                notification: 'has spent too much time in the bathroom',
              }));
            }
          });
        },
        { noAck: true }
      ));
    });
