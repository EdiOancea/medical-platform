require('dotenv').config()
const amqp = require('amqplib');
const fs = require('fs');

const activityRaw = fs.readFileSync('activity.txt', 'utf8');

const getTime = entry => {
  const [date, time] = entry.split(' ');
  const [year, month, day] = date.split('-');
  const [hour, minute, second] = time.split(':');

  return (new Date(year, month, day, hour, minute, second)).getTime();
};

const patientIds = [
  'c606ea9a-21b9-41a6-bd0b-58a49bb6c38f',
  'cd17ed96-21d8-4882-aa97-9d4385e2160b',
  '47e3fc4f-8fe4-426f-8f84-0f1e93f9dcb5',
]

const activities = activityRaw.trim().split('\n')
  .map(line => line.split('\t').filter(word => word.length))
  .map(([startDate, endDate, activity]) => ({
    patientId: patientIds[Math.floor(Math.random() * patientIds.length)],
    start: getTime(startDate),
    end: getTime(endDate),
    activity
  }));

amqp
  .connect(process.env.CLOUDAMQP_URL)
  .then(connection => connection.createChannel())
  .then(channel => {
    const queueName = 'activities';

    return channel
      .assertQueue(queueName, { durable: true })
      .then(() => {
        let i = 0;
        setInterval(() => {
          i = (i + 1) % activities.length;

          channel.sendToQueue(queueName, Buffer.from(JSON.stringify(activities[i])));
        }, 1000);
      });
  });

  const http = require('http');

const port = process.env.PORT || 7000;
http
  .createServer((request, response) => {
    response.writeHead(404);
    response.end();
  })
  .listen(port, () => console.log(`Server is listening on port ${port}`));
