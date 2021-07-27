const WebSocketServer = require('rpc-websockets').Server;
const fetch = require('node-fetch');
require('dotenv').config();

const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

const server = new WebSocketServer({port, host});

const req = async (method, path, body, token) => {
  const authHeader = token ? `Bearer ${token}` : '';
  const url = process.env.REST_API_URL;

  const res = await fetch(`${url}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return await res.json();
};


server.register('signin', async args => {
  const [email, password] = args;

  return await req('POST', '/signin', {email, password});
});

server.register('downloadPlans', async token => {
  const {id} = await req('GET', '/users/me', null, token);
  const plans = await req('GET', `/patients/${id}/plans`, null, token);
  const planIds = plans.map(({id}) => id);
  const planEntries = await Promise.all(planIds.map(planId => (
    req('GET', `/patients/${id}/plans/${planId}`, null, token)
  )))
  const medications = await req('GET', '/medication', null, token);

  return planEntries.map(({entries}) => entries).flat().map(entry => ({
    ...entry,
    medication: medications.find(medication => medication.id === entry.medicationId),
  }));
});

server.register('medicationTaken', id => {
  console.log(`Medication entry ${id} taken at ${new Date()}`);
  return true;
});
server.register('medicationNotTaken', id => {
  console.log(`Medication entry ${id} not taken`);
  return true;
});
