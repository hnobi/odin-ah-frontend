import { defaultNotificationData } from '../../components/notification';

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';


function action(show, data, mode) {
  return {
    type: SHOW_NOTIFICATION,
    data,
    show,
    mode,
  };
}

export function toast(show, data = {}) {
  return action(show, data, 'toast');
}

export function alerts(show, data = {}) {
  return action(show, data, 'alert');
}


export const dismissAlert = (timeout = 0) => (dispatch) => {
  setTimeout(() => {
    dispatch(alerts(false, defaultNotificationData));
  }, timeout);
};
export const showAlert = data => dispatch => dispatch(alerts(true, data));

export const dismissToast = (timeout = 0) => (dispatch) => {
  setTimeout(() => {
    dispatch(toast(false, defaultNotificationData));
  }, timeout);
};
export const showToast = data => dispatch => dispatch(toast(true, data));
