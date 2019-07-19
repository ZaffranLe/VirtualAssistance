import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFullEvaluate, defaultValue } from 'app/shared/model/full-evaluate.model';

export const ACTION_TYPES = {
  FETCH_FULLEVALUATE_LIST: 'fullEvaluate/FETCH_FULLEVALUATE_LIST',
  FETCH_FULLEVALUATE: 'fullEvaluate/FETCH_FULLEVALUATE',
  CREATE_FULLEVALUATE: 'fullEvaluate/CREATE_FULLEVALUATE',
  CREATE_FULLEVALUATE2: 'fullEvaluate/CREATE_FULLEVALUATE2',
  UPDATE_FULLEVALUATE: 'fullEvaluate/UPDATE_FULLEVALUATE',
  DELETE_FULLEVALUATE: 'fullEvaluate/DELETE_FULLEVALUATE',
  RESET: 'fullEvaluate/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFullEvaluate>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FullEvaluateState = Readonly<typeof initialState>;

// Reducer

export default (state: FullEvaluateState = initialState, action): FullEvaluateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FULLEVALUATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FULLEVALUATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FULLEVALUATE):
    case REQUEST(ACTION_TYPES.CREATE_FULLEVALUATE2):
    case REQUEST(ACTION_TYPES.UPDATE_FULLEVALUATE):
    case REQUEST(ACTION_TYPES.DELETE_FULLEVALUATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FULLEVALUATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FULLEVALUATE):
    case FAILURE(ACTION_TYPES.CREATE_FULLEVALUATE):
    case FAILURE(ACTION_TYPES.CREATE_FULLEVALUATE2):
    case FAILURE(ACTION_TYPES.UPDATE_FULLEVALUATE):
    case FAILURE(ACTION_TYPES.DELETE_FULLEVALUATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FULLEVALUATE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FULLEVALUATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FULLEVALUATE):
    case SUCCESS(ACTION_TYPES.CREATE_FULLEVALUATE2):
    case SUCCESS(ACTION_TYPES.UPDATE_FULLEVALUATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FULLEVALUATE):
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

const apiUrl = 'api/full-evaluates';
const apiUrl1 = 'api/full-evaluates-bylogin';
// const apiUrl = 'api/create-full-evaluates';

// Actions

export const getEntities: ICrudGetAllAction<IFullEvaluate> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FULLEVALUATE_LIST,
  payload: axios.get<IFullEvaluate>(`${apiUrl1}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFullEvaluate> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FULLEVALUATE,
    payload: axios.get<IFullEvaluate>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFullEvaluate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FULLEVALUATE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

// ham test tao ban danh gia co cau hoi
export const handleCreate = (listQuestion, questionResult) => ({
  type: ACTION_TYPES.CREATE_FULLEVALUATE2,
  payload: axios.post(`api/create-full-evaluates/${listQuestion}/${questionResult}`),
  meta: {
    successMessage: 'success'
  }
});
export const handleCreateWithName = (listQuestion, questionResult, fileResult, nameSurvey) => ({
  type: ACTION_TYPES.CREATE_FULLEVALUATE2,
  payload: axios.post(`api/create-full-evaluates/${listQuestion}/${questionResult}/${nameSurvey}`, null, { params: { fileResult } }),
  meta: {
    successMessage: 'success'
  }
});
export const handleCreateWithAns = (nameSurvey, answerList) => ({
  type: ACTION_TYPES.CREATE_FULLEVALUATE2,
  payload: axios.post(`api/create-full-evaluates-ans/${nameSurvey}`, answerList, null),
  meta: {
    successMessage: 'success'
  }
});
export const handleUpdateWithName = (idFullEvaluate, questionResult, nameSurvey, answerList) => ({
  type: ACTION_TYPES.CREATE_FULLEVALUATE2,
  payload: axios.put(`api/create-full-evaluates/${idFullEvaluate}/${questionResult}/${nameSurvey}`, answerList, null),
  meta: {
    successMessage: 'success'
  }
});

export const updateEntity: ICrudPutAction<IFullEvaluate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FULLEVALUATE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFullEvaluate> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FULLEVALUATE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
