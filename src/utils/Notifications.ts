import Noty from 'noty';

const NOTY_THEME = 'nest';

function notifySuccess (text: string) {
  new Noty({
    text: text,
    type: 'success',
    theme: NOTY_THEME,
    timeout: 2000,
    progressBar: true
  }).show();
}

function notifyError (text: string) {
  new Noty({
    text: text,
    type: 'error',
    theme: NOTY_THEME,
    timeout: 2000,
    progressBar: true
  }).show();
}

function notifyWarning (text: string) {
  new Noty({
    text: text,
    type: 'warning',
    theme: NOTY_THEME,
    timeout: 2000,
    progressBar: true
  }).show();
}

export {
  notifySuccess,
  notifyError,
  notifyWarning
}
