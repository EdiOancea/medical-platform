import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';

import getRPCService from './rpcService';

const rpcService = getRPCService();
const useStyles = makeStyles({
  table: {
    maxWidth: 650,
  },
  container: {
    width: 650,
    margin: 'auto',
  },
  button: {
    backgroundColor: 'lightblue'
  }
});

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const now = () => new Date();

const App = () => {
  const classes = useStyles();
  const [medicationPlan, setMedicationPlan] = useState([]);
  const [token, setToken] = useState(null);
  const [toBeAddedTimers, setToBeAddedTimers] = useState({});
  const [toBeRemovedTimers, setToBeRemovedTimers] = useState({});
  const [currentTime, setCurrentTime] = useState(now().getTime());
  const removeMedication = id => setMedicationPlan(
    medicationPlan.filter(medication => medication.id !== id)
  );
  const setupMedicationTimer = ({id, interval}) => {
    const curr = now().getTime();
    const start = now().setHours(interval, 0, 0, 0);
    const end = now().setHours(interval + 1, 0, 0, 0);

    if (curr > end) {
      removeMedication(id);
    } else if (curr > start) {
      setToBeRemovedTimers(prevTimers => ({
        ...prevTimers,
        [id]: setTimeout(() => medicationExpired(id), end - curr),
      }));
    } else {
      setToBeAddedTimers(prevTimers => ({
        ...prevTimers,
        [id]: setTimeout(
          () => setToBeRemovedTimers(prevTimers => ({
            ...prevTimers,
            [id]: setTimeout(
              () => medicationExpired(id),
              end - start
            ),
          })),
          start - curr
        ),
      }));
    }
  };
  const takeMedication = id => rpcService.medicationTaken(id, id => {
    removeMedication(id);
    clearTimeout(toBeRemovedTimers[id]);
    setToBeRemovedTimers(({[id]: _, ...prevTimers}) => prevTimers);
  });
  const medicationExpired = id => rpcService.medicationNotTaken(id, removeMedication);
  const setupMedicationPlan = medicationPlan => {
    setMedicationPlan(medicationPlan);
    medicationPlan.forEach(setupMedicationTimer);
  };
  useEffect(() => {
    rpcService.initiate(setToken);
  }, []);

  useEffect(() => () => {
    Object.values(toBeAddedTimers).forEach(timer => clearTimeout(timer));
    Object.values(toBeRemovedTimers).forEach(timer => clearTimeout(timer));
  }, [toBeAddedTimers, toBeRemovedTimers]);

  useEffect(() => {
    if (!token) {
      return;
    }

    rpcService.downloadPlans(token, setupMedicationPlan);

    const currentTimeInterval = setInterval(() => setCurrentTime(prevTime => prevTime + SECOND), SECOND);
    let downloadInterval = null;
    const nextPlanTime = now().setHours(0, 0, 0, 0) + DAY;
    const timeoutForInterval = setTimeout(
      () => {
        rpcService.downloadPlans(token, setupMedicationPlan);
        downloadInterval = setInterval(() => rpcService.downloadPlans(token, setupMedicationPlan), DAY);
      },
      nextPlanTime - now().getTime()
    );

    return () => {
      clearInterval(currentTimeInterval);
      clearTimeout(timeoutForInterval);

      if (downloadInterval !== null) {
        clearInterval(downloadInterval);
      }
    };
  }, [token]);

  return token && (
    <div>
      <h1 style={{textAlign: 'center'}}>{(new Date(currentTime)).toLocaleTimeString()}</h1>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Medication Name</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicationPlan.filter(({id}) => toBeRemovedTimers[id]).map(({id, medication: {name}}) => (
              <TableRow key={name}>
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="right">
                  <Button
                    className={classes.button}
                    onClick={() => takeMedication(id)}
                  >
                    Taken
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
