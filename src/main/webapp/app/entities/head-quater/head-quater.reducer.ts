import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IHeadQuater, defaultValue } from 'app/shared/model/head-quater.model';

export const ACTION_TYPES = {
  FETCH_HEADQUATER_LIST: 'headQuater/FETCH_HEADQUATER_LIST',
  FETCH_HEADQUATER: 'headQuater/FETCH_HEADQUATER',
  CREATE_HEADQUATER: 'headQuater/CREATE_HEADQUATER',
  UPDATE_HEADQUATER: 'headQuater/UPDATE_HEADQUATER',
  DELETE_HEADQUATER: 'headQuater/DELETE_HEADQUATER',
  RESET: 'headQuater/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHeadQuater>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type HeadQuaterState = Readonly<typeof initialState>;

// Reducer

export default (state: HeadQuaterState = initialState, action): HeadQuaterState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_HEADQUATER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HEADQUATER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_HEADQUATER):
    case REQUEST(ACTION_TYPES.UPDATE_HEADQUATER):
    case REQUEST(ACTION_TYPES.DELETE_HEADQUATER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_HEADQUATER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HEADQUATER):
    case FAILURE(ACTION_TYPES.CREATE_HEADQUATER):
    case FAILURE(ACTION_TYPES.UPDATE_HEADQUATER):
    case FAILURE(ACTION_TYPES.DELETE_HEADQUATER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_HEADQUATER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HEADQUATER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_HEADQUATER):
    case SUCCESS(ACTION_TYPES.UPDATE_HEADQUATER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_HEADQUATER):
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

const apiUrl = 'api/head-quaters';

// Actions

export const getEntities: ICrudGetAllAction<IHeadQuater> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_HEADQUATER_LIST,
  payload: axios.get<IHeadQuater>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IHeadQuater> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HEADQUATER,
    payload: axios.get<IHeadQuater>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IHeadQuater> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HEADQUATER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHeadQuater> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HEADQUATER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHeadQuater> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HEADQUATER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
