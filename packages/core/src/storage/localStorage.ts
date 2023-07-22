import { LocalStorageKeys } from "./LocalStorageKeys";

export const getLocalStorage = <T>(key: LocalStorageKeys): T | undefined => {
  const value = localStorage.getItem(key);

  if (!value) {
    return undefined;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    console.error(error);
  }
};

export const setLocalStorage = <T>(key: LocalStorageKeys, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const removeLocalStorage = (key: LocalStorageKeys) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
