export const setTheme = (theme?: string) => {
  document.documentElement.setAttribute("data-theme", theme);
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

export const parseArrayBody = (parameter: string | string[]) => {
  if (!parameter) return [];
  if (typeof parameter === "string") {
    return parameter.split(",").map((x: string) => x.trim());
  }
  return parameter;
};
