import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

import { removeAlert } from 'actions/alerts';

const Alerts = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(state => (
    Object
      .entries(state.alerts)
      .map(([key, alert]) => ({ key, alert }))
      .map(({ alert: { patientId, ...restAlert }, key }) => ({
        key,
        alert: {
          ...restAlert,
          patientName: (state.patients.entities[patientId] || {}).name
        },
      }))
      .filter(alert => alert.alert.patientName)
  ));
  const dismissAlert = id => dispatch(removeAlert(id));

  return (
    <div>
      {alerts.map(({key, alert: { notification, patientName }}) => (
        <Alert
          key={key}
          severity="warning"
          color="warning"
          onClose={() => dismissAlert(key)}
        >
          {patientName} {notification}
        </Alert>
      ))}
    </div>
  );
}

export default Alerts;
