import Noty from 'noty';

const NOTY_THEME = 'nest';

function notifySuccess(text: string): void {
  new Noty({
    text,
    type: 'success',
    theme: NOTY_THEME,
    timeout: 2000,
    progressBar: true,
  }).show();
}

function notifyError(text: string): void {
  new Noty({
    text,
    type: 'error',
    theme: NOTY_THEME,
    timeout: 2000,
    progressBar: true,
  }).show();
}

function notifyWarning(text: string): void {
  new Noty({
    text,
    type: 'warning',
    theme: NOTY_THEME,
    timeout: 2000,
    progressBar: true,
  }).show();
}

export { notifySuccess, notifyError, notifyWarning };
