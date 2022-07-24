export const setTheme = (theme?: string) => {
  document.documentElement.setAttribute("data-theme", theme);
};

export const setMsgAlert = (message: string) => {
  const msg = useMsg();
  msg.value = message;
  setTimeout(() => {
    msg.value = "";
  }, 2000);
};

export const setErrAlert = (message: string) => {
  const msg = useErrorMsg();
  msg.value = message;
  setTimeout(() => {
    msg.value = "";
  }, 2000);
};
