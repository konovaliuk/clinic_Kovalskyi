export const getAction = (path: string): string => {
  let action: string;
  const lastSlashIndex: number = path.lastIndexOf("/");
  action = path.substring(lastSlashIndex + 1);
  const questionMarkIndex = action.indexOf("?");
  action = questionMarkIndex !== -1 ? action.substring(0, questionMarkIndex - 1) : action;
  return action;
};
