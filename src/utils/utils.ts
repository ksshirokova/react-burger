export const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((res) => Promise.reject(res));
};
const checkSuccess = (res: any) => {
  if (res && res.success) {
    return res;
  }

  return Promise.reject(`Ошибка: ${res}`);
};

export function requestData(url: string, options?: object) {
  return fetch(url, options).then(checkResponse).then(checkSuccess);
}

export function setCookie(
  name: string,
  value: string,
  props?: {
    expires?: any;
    "max-age"?: number;
    [x: string]: any;
    secure?: boolean;
    path?: number;
  }
) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, "null", { path: -1 });
}
