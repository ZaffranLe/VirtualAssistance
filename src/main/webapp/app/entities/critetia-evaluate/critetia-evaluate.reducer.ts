import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICritetiaEvaluate, defaultValue } from 'app/shared/model/critetia-evaluate.model';

export const ACTION_TYPES = {
  FETCH_CRITETIAEVALUATE_LIST: 'critetiaEvaluate/FETCH_CRITETIAEVALUATE_LIST',
  FETCH_CRITETIAEVALUATE: 'critetiaEvaluate/FETCH_CRITETIAEVALUATE',
  CREATE_CRITETIAEVALUATE: 'critetiaEvaluate/CREATE_CRITETIAEVALUATE',
  UPDATE_CRITETIAEVALUATE: 'critetiaEvaluate/UPDATE_CRITETIAEVALUATE',
  DELETE_CRITETIAEVALUATE: 'critetiaEvaluate/DELETE_CRITETIAEVALUATE',
  RESET: 'critetiaEvaluate/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICritetiaEvaluate>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CritetiaEvaluateState = Readonly<typeof initialState>;

// Reducer

export default (state: CritetiaEvaluateState = initialState, action): CritetiaEvaluateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CRITETIAEVALUATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CRITETIAEVALUATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CRITETIAEVALUATE):
    case REQUEST(ACTION_TYPES.UPDATE_CRITETIAEVALUATE):
    case REQUEST(ACTION_TYPES.DELETE_CRITETIAEVALUATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CRITETIAEVALUATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CRITETIAEVALUATE):
    case FAILURE(ACTION_TYPES.CREATE_CRITETIAEVALUATE):
    case FAILURE(ACTION_TYPES.UPDATE_CRITETIAEVALUATE):
    case FAILURE(ACTION_TYPES.DELETE_CRITETIAEVALUATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CRITETIAEVALUATE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CRITETIAEVALUATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CRITETIAEVALUATE):
    case SUCCESS(ACTION_TYPES.UPDATE_CRITETIAEVALUATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CRITETIAEVALUATE):
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

const apiUrl = 'api/critetia-evaluates';

// Actions

export const getEntities: ICrudGetAllAction<ICritetiaEvaluate> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CRITETIAEVALUATE_LIST,
  payload: axios.get<ICritetiaEvaluate>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICritetiaEvaluate> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CRITETIAEVALUATE,
    payload: axios.get<ICritetiaEvaluate>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICritetiaEvaluate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CRITETIAEVALUATE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICritetiaEvaluate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CRITETIAEVALUATE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICritetiaEvaluate> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CRITETIAEVALUATE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
