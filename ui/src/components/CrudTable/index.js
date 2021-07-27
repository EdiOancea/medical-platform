import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableFooter,
  TableRow,
  Paper,
  IconButton,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  AddCircle as AddCircleIcon,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  deleteIcon: {
    color: theme.palette.primary.main,
  },
  editIcon: {
    color: theme.palette.primary.light,
  },
  deleteButton: {
    width: '20px',
  },
  editButton: {
    width: '20px',
  },
  addButton: {
    borderRadius: '20px',
  },
  addButtonIcon: {
    color: theme.palette.primary.main,
  },
  addButtonLabel: {
    fontSize: 12,
    marginLeft: '5px',
  },
  title: {
    color: '#000000',
    paddingLeft: '5px',
  },
  cell: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  container: {
    marginLeft: '10%',
    marginRight: '10%',
  },
}));

const getDeepKey = (obj, key) => key.split('.').reduce((acc, i) => (acc || {})[i], obj) || 'N/A';

const CrudTable = ({
  headers = [],
  entities = [],
  displayEntities = [],
  rowKeys = [],
  onDelete,
  EntityForm,
  addButtonLabel,
  extraActions = [],
  readOnly = false,
  title = '',
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{title || addButtonLabel}</h1>
      <TableContainer className={classes.table} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableCell className={classes.cell} key={header}>{header}</TableCell>
              ))}
              {extraActions.map(({ Header, key }) => <TableCell key={key}><Header /></TableCell>)}
              {!readOnly && (
                <Fragment>
                  <TableCell className={classes.editButton}/>
                  <TableCell className={classes.deleteButton}/>
                </Fragment>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {entities.map((entity, idx) => (
              <TableRow key={entity.id}>
                {rowKeys.map(key => {
                  const displayEntity = displayEntities[idx] || entity;

                  return (
                    <TableCell
                      className={classes.cell}
                      key={`${key}_${getDeepKey(displayEntity, key)}`}
                    >
                      {getDeepKey(displayEntity, key)}
                    </TableCell>
                  )
                })}
                {extraActions.map(({ Action, key }) => (
                  <TableCell key={key}>
                    <Action entity={entity} />
                  </TableCell>
                ))}
                {!readOnly && (
                  <Fragment>
                    <TableCell>
                      <IconButton>
                        <EntityForm entity={entity}>
                          <EditIcon className={classes.editIcon} />
                        </EntityForm>
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => onDelete(entity.id)}>
                        <DeleteIcon className={classes.deleteIcon} />
                      </IconButton>
                    </TableCell>
                  </Fragment>
                )}
              </TableRow>
            ))}
          </TableBody>
          {!readOnly && (
            <TableFooter>
              <TableRow>
                <TableCell>
                  <EntityForm>
                    <IconButton className={classes.addButton}>
                      <AddCircleIcon className={classes.addButtonIcon} />
                      <span className={classes.addButtonLabel}>
                        {addButtonLabel}
                      </span>
                    </IconButton>
                  </EntityForm>
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default CrudTable;
