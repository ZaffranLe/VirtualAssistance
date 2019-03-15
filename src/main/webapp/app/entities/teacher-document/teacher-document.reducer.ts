import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITeacherDocument, defaultValue } from 'app/shared/model/teacher-document.model';

export const ACTION_TYPES = {
  FETCH_TEACHERDOCUMENT_LIST: 'teacherDocument/FETCH_TEACHERDOCUMENT_LIST',
  FETCH_TEACHERDOCUMENT: 'teacherDocument/FETCH_TEACHERDOCUMENT',
  CREATE_TEACHERDOCUMENT: 'teacherDocument/CREATE_TEACHERDOCUMENT',
  UPDATE_TEACHERDOCUMENT: 'teacherDocument/UPDATE_TEACHERDOCUMENT',
  DELETE_TEACHERDOCUMENT: 'teacherDocument/DELETE_TEACHERDOCUMENT',
  RESET: 'teacherDocument/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITeacherDocument>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TeacherDocumentState = Readonly<typeof initialState>;

// Reducer

export default (state: TeacherDocumentState = initialState, action): TeacherDocumentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TEACHERDOCUMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TEACHERDOCUMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TEACHERDOCUMENT):
    case REQUEST(ACTION_TYPES.UPDATE_TEACHERDOCUMENT):
    case REQUEST(ACTION_TYPES.DELETE_TEACHERDOCUMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TEACHERDOCUMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TEACHERDOCUMENT):
    case FAILURE(ACTION_TYPES.CREATE_TEACHERDOCUMENT):
    case FAILURE(ACTION_TYPES.UPDATE_TEACHERDOCUMENT):
    case FAILURE(ACTION_TYPES.DELETE_TEACHERDOCUMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TEACHERDOCUMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TEACHERDOCUMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TEACHERDOCUMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_TEACHERDOCUMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TEACHERDOCUMENT):
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

const apiUrl = 'api/teacher-documents';

// Actions

export const getEntities: ICrudGetAllAction<ITeacherDocument> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TEACHERDOCUMENT_LIST,
  payload: axios.get<ITeacherDocument>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITeacherDocument> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TEACHERDOCUMENT,
    payload: axios.get<ITeacherDocument>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITeacherDocument> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TEACHERDOCUMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITeacherDocument> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TEACHERDOCUMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITeacherDocument> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TEACHERDOCUMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
