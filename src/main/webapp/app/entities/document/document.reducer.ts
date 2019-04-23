import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDocument, defaultValue } from 'app/shared/model/document.model';

export const ACTION_TYPES = {
  FETCH_DOCUMENT_LIST: 'document/FETCH_DOCUMENT_LIST',
  FETCH_DOCUMENT: 'document/FETCH_DOCUMENT',
  CREATE_DOCUMENT: 'document/CREATE_DOCUMENT',
  UPDATE_DOCUMENT: 'document/UPDATE_DOCUMENT',
  DELETE_DOCUMENT: 'document/DELETE_DOCUMENT',
  RESET: 'document/RESET',
  UPLOAD: 'document/upload'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDocument>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
  uploadFile: null,
  authenkey: null
};

export type DocumentState = Readonly<typeof initialState>;

// Reducer

export default (state: DocumentState = initialState, action): DocumentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DOCUMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DOCUMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DOCUMENT):
    case REQUEST(ACTION_TYPES.UPDATE_DOCUMENT):
    case REQUEST(ACTION_TYPES.DELETE_DOCUMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DOCUMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DOCUMENT):
    case FAILURE(ACTION_TYPES.CREATE_DOCUMENT):
    case FAILURE(ACTION_TYPES.UPDATE_DOCUMENT):
    case FAILURE(ACTION_TYPES.DELETE_DOCUMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOCUMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOCUMENT):
      // console.log('action: ' + JSON.stringify(action));
      return {
        ...state,
        loading: false,
        entity: action.payload.data.doc,
        authenkey: action.payload.data.authenkey
      };
    case SUCCESS(ACTION_TYPES.CREATE_DOCUMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_DOCUMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case ACTION_TYPES.UPLOAD:
      return {
        // return lai state moi
        ...state,
        uploadFile: action.uploadFile,
        // updateSuccess: true,
        // updating: true,
        entity: {
          ...state.entity,
          uRL: action.uploadFile,
          fileExtension: action.fileExtension
        }
      };
    case SUCCESS(ACTION_TYPES.DELETE_DOCUMENT):
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

const apiUrl = 'api/documents';

// Actions
const apiUrl2 = 'api/documents-private'; // api nay lay danh sach document private
const apiUrl3 = 'api/documents-public'; // api nay lay danh sach document public
const apiUrl4 = 'api/documents-byLogin'; // api nay lay danh sach document public
export const getEntitiesbyLogin: ICrudGetAllAction<IDocument> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DOCUMENT_LIST,
  payload: axios.get<IDocument>(`${apiUrl4}?cacheBuster=${new Date().getTime()}`)
});
export const getPrivateEntities: ICrudGetAllAction<IDocument> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DOCUMENT_LIST,
  payload: axios.get<IDocument>(`${apiUrl4}?cacheBuster=${new Date().getTime()}`)
});

export const getPublicEntities: ICrudGetAllAction<IDocument> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DOCUMENT_LIST,
  payload: axios.get<IDocument>(`${apiUrl3}?cacheBuster=${new Date().getTime()}`)
});

export const getEntities: ICrudGetAllAction<IDocument> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DOCUMENT_LIST,
  payload: axios.get<IDocument>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

// tslint:disable-next-line:ter-arrow-body-style
export const getUploadFile = uploadFile => {
  const ext = uploadFile
    .split('.')
    .pop()
    .toUpperCase();
  return {
    type: ACTION_TYPES.UPLOAD,
    uploadFile,
    ext,
    payload: {
      uRL: uploadFile,
      fileExtension: ext
    }
  };
};

export const getEntity: ICrudGetAction<IDocument> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  const request = axios.get<IDocument>(requestUrl);
  let data;
  let authenkey;
  request.then(response => {
    data = response.data;
    authenkey = response.data.authenkey;
  });
  return {
    type: ACTION_TYPES.FETCH_DOCUMENT,
    // payload: axios.get<IDocument>(requestUrl)
    payload: request,
    // tslint:disable-next-line:object-literal-shorthand
    authenkey: authenkey
  };
};

export const createEntity: ICrudPutAction<IDocument> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DOCUMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDocument> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DOCUMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDocument> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DOCUMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
