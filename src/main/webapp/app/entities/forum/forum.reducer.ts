import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IForum, defaultValue } from 'app/shared/model/forum.model';

export const ACTION_TYPES = {
  FETCH_FORUM_LIST: 'forum/FETCH_FORUM_LIST',
  FETCH_FORUM_LISTNEW: 'forum/FETCH_FORUM_LISTNEW',
  FETCH_FORUM: 'forum/FETCH_FORUM',
  CREATE_FORUM: 'forum/CREATE_FORUM',
  UPDATE_FORUM: 'forum/UPDATE_FORUM',
  DELETE_FORUM: 'forum/DELETE_FORUM',
  RESET: 'forum/RESET'
};

const initialState = {
  loading: true,
  errorMessage: null,
  entities: [] as ReadonlyArray<IForum>,
  entitiesnew: [] as ReadonlyArray<IForum>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ForumState = Readonly<typeof initialState>;

// Reducer

export default (state: ForumState = initialState, action): ForumState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FORUM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FORUM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FORUM):
    case REQUEST(ACTION_TYPES.UPDATE_FORUM):
    case REQUEST(ACTION_TYPES.DELETE_FORUM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FORUM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FORUM):
    case FAILURE(ACTION_TYPES.CREATE_FORUM):
    case FAILURE(ACTION_TYPES.UPDATE_FORUM):
    case FAILURE(ACTION_TYPES.DELETE_FORUM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FORUM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FORUM_LISTNEW):
      return {
        ...state,
        loading: false,
        entitiesnew: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FORUM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FORUM):
    case SUCCESS(ACTION_TYPES.UPDATE_FORUM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FORUM):
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

const apiUrl = 'api/forums';
const apiUrlnew = 'api/forumsnew';
const apiUrlnewtopic = 'api/forumsnewtopic';

// Actions

export const getEntities: ICrudGetAllAction<IForum> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FORUM_LIST,
  payload: axios.get<IForum>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});
export const getNewEntities: ICrudGetAllAction<IForum> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FORUM_LISTNEW,
  payload: axios.get<IForum>(`${apiUrlnew}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IForum> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FORUM,
    payload: axios.get<IForum>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IForum> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FORUM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};
export const createEntityNewtopic: ICrudPutAction<IForum> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FORUM,
    payload: axios.post(apiUrlnewtopic, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IForum> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FORUM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IForum> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FORUM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
