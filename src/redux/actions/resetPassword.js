import {
  SAVE_INPUT,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_REQUEST_SUCCESS,
  PASSWORD_RESET_REQUEST_FAILURE,
  COMPLETE_RESET_REQUEST,
  COMPLETE_RESET_REQUEST_SUCCESS,
  COMPLETE_RESET_REQUEST_FAILURE,
  INPUT_ERROR
} from '../constants/resetPassword';
import apiRequest from '../../services/apiRequest';
import { dispatchError, dispatchSuccess, getErrorMessage } from './auth/register';
import userValidator from '../../validators/UserValidator';

const messages = {
  404: 'User Not Found',
  500: 'Server Error',
  200: 'Success Message',
  passwordUnmatch: 'Please your passwords do not match',
  emptyInput: 'Empty Inputs',

};

export const saveInput = (field, value) => (dispatch) => {
  dispatch({
    type: SAVE_INPUT,
    payload: {
      field,
      value
    }
  });
};

export const inputError = errors => ({
  type: INPUT_ERROR,
  payload: {
    errors
  }
});
export const resetRequestHandler = email => async (dispatch) => {
  const errors = userValidator.validateField({ email });
  dispatch(inputError(errors));
  if (!errors) {
    try {
      dispatch({
        type: PASSWORD_RESET_REQUEST,
        payload: {
          data: email,
          loading: true
        }
      });
      const response = await apiRequest.startResetPassword(email);
      dispatchSuccess(response.data.message, 'alert', dispatch);
      dispatch({
        type: PASSWORD_RESET_REQUEST_SUCCESS,
        payload: {
          message: response.data.message,
          loading: false,

        }
      });
    } catch (error) {
      const message = messages[error.response.status];
      dispatchError(message, 'alert', dispatch);
      dispatch({
        type: PASSWORD_RESET_REQUEST_FAILURE,
        payload: {
          message,
          status: 'done',
          loading: false
        }
      });
    }
  }
};


export const completeResetRequest = data => (dispatch) => {
  const errors = userValidator.validateField(data);
  dispatch(inputError(errors));

  if (!errors) {
    dispatch({
      type: COMPLETE_RESET_REQUEST,
      payload: {
        data
      }
    });
    apiRequest
      .completeResetPassword(data)
      .then((response) => {
        const message = messages[response.status];
        dispatchSuccess(response.data.message, 'alert', dispatch);
        dispatch({
          type: COMPLETE_RESET_REQUEST_SUCCESS,
          payload: {
            message,
          }
        });
      })
      .catch((error) => {
        const message = messages[error.response.status] || getErrorMessage(error).message;
        dispatchError(message, 'alert', dispatch);
        dispatch({
          type: COMPLETE_RESET_REQUEST_FAILURE,
          payload: {
            message
          }
        });
      });
  }
};

export const saveInputHandler = (field, value) => (dispatch) => {
  dispatch(inputError(null));
  dispatch(saveInput(field, value));
};
