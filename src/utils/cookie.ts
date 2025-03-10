import Cookies from "js-cookie";

// 设置 cookie
export const setCookie = (key: string, value: string | object, options?: Cookies.CookieAttributes) => {
  try {
    if (typeof value === 'object') {
      Cookies.set(key, JSON.stringify(value), options);
    } else {
      Cookies.set(key, value, options);
    }
  } catch (error) {
    console.error('Error setting cookie:', error);
  }
};

// 获取 cookie
export const getCookie = <T>(key: string): T | string | null => {
  try {
    const value = Cookies.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return value;
    }
  } catch (error) {
    console.error('Error getting cookie:', error);
    return null;
  }
};

// 移除 cookie
export const removeCookie = (key: string, options?: Cookies.CookieAttributes) => {
  try {
    Cookies.remove(key, options);
  } catch (error) {
    console.error('Error removing cookie:', error);
  }
};