export const addAlert = alert => ({
  type: 'ADD_ALERT',
  payload: alert,
});

export const removeAlert = id => ({
  type: 'REMOVE_ALERT',
  payload: id,
});

export const clearPatientAlerts = patientId => ({
  type: 'CLEAR_ALERTS',
  payload: patientId,
});
