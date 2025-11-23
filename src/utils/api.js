export const BASE_URL = "https://norma.education-services.ru/api/";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(res);
};

export const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};
