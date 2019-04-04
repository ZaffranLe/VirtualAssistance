import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDocumentType, defaultValue } from 'app/shared/model/document-type.model';

export const ACTION_TYPES = {
  FETCH_DOCUMENTTYPE_LIST: 'documentType/FETCH_DOCUMENTTYPE_LIST',
  FETCH_DOCUMENTTYPE: 'documentType/FETCH_DOCUMENTTYPE',
  CREATE_DOCUMENTTYPE: 'documentType/CREATE_DOCUMENTTYPE',
  UPDATE_DOCUMENTTYPE: 'documentType/UPDATE_DOCUMENTTYPE',
  DELETE_DOCUMENTTYPE: 'documentType/DELETE_DOCUMENTTYPE',
  RESET: 'documentType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDocumentType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DocumentTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: DocumentTypeState = initialState, action): DocumentTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DOCUMENTTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DOCUMENTTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DOCUMENTTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_DOCUMENTTYPE):
    case REQUEST(ACTION_TYPES.DELETE_DOCUMENTTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DOCUMENTTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DOCUMENTTYPE):
    case FAILURE(ACTION_TYPES.CREATE_DOCUMENTTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_DOCUMENTTYPE):
    case FAILURE(ACTION_TYPES.DELETE_DOCUMENTTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOCUMENTTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOCUMENTTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DOCUMENTTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_DOCUMENTTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DOCUMENTTYPE):
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

const apiUrl = 'api/document-types';

// Actions

export const getEntities: ICrudGetAllAction<IDocumentType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DOCUMENTTYPE_LIST,
  payload: axios.get<IDocumentType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

// tslint:disable-next-line:ter-arrow-body-style
export const getEntity: ICrudGetAction<IDocumentType> = id => {
  return {
    type: ACTION_TYPES.FETCH_DOCUMENTTYPE,
    payload: axios.get<IDocumentType>(apiUrl)
    // payload: data
  };
};

export const createEntity: ICrudPutAction<IDocumentType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DOCUMENTTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDocumentType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DOCUMENTTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDocumentType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DOCUMENTTYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
