// 设置 localStorage
export const setLocalStorage = (key: string, value: unknown) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
};

// 获取 localStorage
export const getLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error('Error getting localStorage:', error);
    return null;
  }
};

// 移除 localStorage
export const removeLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing localStorage:', error);
  }
};

// 清空 localStorage
export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

// 设置 sessionStorage
export const setSessionStorage = (key: string, value: unknown) => {
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error setting sessionStorage:', error);
  }
};

// 获取 sessionStorage
export const getSessionStorage = <T>(key: string): T | null => {
  try {
    const serializedValue = sessionStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error('Error getting sessionStorage:', error);
    return null;
  }
};

// 移除 sessionStorage
export const removeSessionStorage = (key: string) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing sessionStorage:', error);
  }
};

// 清空 sessionStorage
export const clearSessionStorage = () => {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.error('Error clearing sessionStorage:', error);
  }
};