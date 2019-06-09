import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProofType, defaultValue } from 'app/shared/model/proof-type.model';

export const ACTION_TYPES = {
  FETCH_PROOFTYPE_LIST: 'proofType/FETCH_PROOFTYPE_LIST',
  FETCH_PROOFTYPE: 'proofType/FETCH_PROOFTYPE',
  CREATE_PROOFTYPE: 'proofType/CREATE_PROOFTYPE',
  UPDATE_PROOFTYPE: 'proofType/UPDATE_PROOFTYPE',
  DELETE_PROOFTYPE: 'proofType/DELETE_PROOFTYPE',
  RESET: 'proofType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProofType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ProofTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: ProofTypeState = initialState, action): ProofTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROOFTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROOFTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROOFTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_PROOFTYPE):
    case REQUEST(ACTION_TYPES.DELETE_PROOFTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROOFTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROOFTYPE):
    case FAILURE(ACTION_TYPES.CREATE_PROOFTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_PROOFTYPE):
    case FAILURE(ACTION_TYPES.DELETE_PROOFTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROOFTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROOFTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROOFTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_PROOFTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROOFTYPE):
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

const apiUrl = 'api/proof-types';

// Actions

export const getEntities: ICrudGetAllAction<IProofType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROOFTYPE_LIST,
  payload: axios.get<IProofType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IProofType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROOFTYPE,
    payload: axios.get<IProofType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProofType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROOFTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProofType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROOFTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProofType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROOFTYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
