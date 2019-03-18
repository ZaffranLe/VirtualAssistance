import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICriteriaEvaluate, defaultValue } from 'app/shared/model/criteria-evaluate.model';

export const ACTION_TYPES = {
  FETCH_CRITERIAEVALUATE_LIST: 'criteriaEvaluate/FETCH_CRITERIAEVALUATE_LIST',
  FETCH_CRITERIAEVALUATE: 'criteriaEvaluate/FETCH_CRITERIAEVALUATE',
  CREATE_CRITERIAEVALUATE: 'criteriaEvaluate/CREATE_CRITERIAEVALUATE',
  UPDATE_CRITERIAEVALUATE: 'criteriaEvaluate/UPDATE_CRITERIAEVALUATE',
  DELETE_CRITERIAEVALUATE: 'criteriaEvaluate/DELETE_CRITERIAEVALUATE',
  RESET: 'criteriaEvaluate/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICriteriaEvaluate>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CriteriaEvaluateState = Readonly<typeof initialState>;

// Reducer

export default (state: CriteriaEvaluateState = initialState, action): CriteriaEvaluateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CRITERIAEVALUATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CRITERIAEVALUATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CRITERIAEVALUATE):
    case REQUEST(ACTION_TYPES.UPDATE_CRITERIAEVALUATE):
    case REQUEST(ACTION_TYPES.DELETE_CRITERIAEVALUATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CRITERIAEVALUATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CRITERIAEVALUATE):
    case FAILURE(ACTION_TYPES.CREATE_CRITERIAEVALUATE):
    case FAILURE(ACTION_TYPES.UPDATE_CRITERIAEVALUATE):
    case FAILURE(ACTION_TYPES.DELETE_CRITERIAEVALUATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CRITERIAEVALUATE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CRITERIAEVALUATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CRITERIAEVALUATE):
    case SUCCESS(ACTION_TYPES.UPDATE_CRITERIAEVALUATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CRITERIAEVALUATE):
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

const apiUrl = 'api/criteria-evaluates';

// Actions

export const getCriteriaEvaluateEntities: ICrudGetAllAction<ICriteriaEvaluate> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CRITERIAEVALUATE_LIST,
  payload: axios.get<ICriteriaEvaluate>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICriteriaEvaluate> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CRITERIAEVALUATE,
    payload: axios.get<ICriteriaEvaluate>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICriteriaEvaluate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CRITERIAEVALUATE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getCriteriaEvaluateEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICriteriaEvaluate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CRITERIAEVALUATE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getCriteriaEvaluateEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICriteriaEvaluate> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CRITERIAEVALUATE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getCriteriaEvaluateEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
