import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProofs, defaultValue } from 'app/shared/model/proofs.model';

export const ACTION_TYPES = {
  FETCH_PROOFS_LIST: 'proofs/FETCH_PROOFS_LIST',
  FETCH_PROOFS: 'proofs/FETCH_PROOFS',
  CREATE_PROOFS: 'proofs/CREATE_PROOFS',
  UPDATE_PROOFS: 'proofs/UPDATE_PROOFS',
  DELETE_PROOFS: 'proofs/DELETE_PROOFS',
  RESET: 'proofs/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProofs>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ProofsState = Readonly<typeof initialState>;

// Reducer

export default (state: ProofsState = initialState, action): ProofsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROOFS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROOFS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROOFS):
    case REQUEST(ACTION_TYPES.UPDATE_PROOFS):
    case REQUEST(ACTION_TYPES.DELETE_PROOFS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROOFS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROOFS):
    case FAILURE(ACTION_TYPES.CREATE_PROOFS):
    case FAILURE(ACTION_TYPES.UPDATE_PROOFS):
    case FAILURE(ACTION_TYPES.DELETE_PROOFS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROOFS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROOFS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROOFS):
    case SUCCESS(ACTION_TYPES.UPDATE_PROOFS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROOFS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/proofs';

// Actions

export const getEntities: ICrudGetAllAction<IProofs> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROOFS_LIST,
  payload: axios.get<IProofs>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IProofs> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROOFS,
    payload: axios.get<IProofs>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProofs> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROOFS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProofs> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROOFS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProofs> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROOFS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
