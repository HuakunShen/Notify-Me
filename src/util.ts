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

export const composeMessage = (
  name: string,
  email: string,
  message: string
): string => {
  let composedBody: string = "";
  if (name) composedBody += `${name} `;
  if (email) composedBody += `(${email}) `;
  if (name || email) composedBody += "said: ";
  composedBody += message;
  return composedBody;
};

export const queryVarToString = (
  queryVar: string | string[] | undefined | null
) => {
  if (!queryVar) return "";
  if (queryVar instanceof Array) {
    return queryVar.join(", ");
  }
  return queryVar;
};
