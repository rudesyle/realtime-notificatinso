import axios from 'axios';
import { Config } from 'App/Config';
import { is, curryN, gte } from 'ramda';
import DeviceStorage from 'App/Services/DeviceStorage';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number);
  return (
    isNumber(min)
    && isNumber(max)
    && isNumber(value)
    && gte(value, min)
    && gte(max, value)
  );
});
const in200s = isWithin(200, 299);

const IdToken = async () => {
  try {
    await AsyncStorage.getItem('idToken').then((token) => token);
  } catch (error) {
    return null;
  }
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const userApiClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-application': 'https://qa.realtimemed.com',
  },
  timeout: 3000,
});

userApiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    config.headers.authorization = `Bearer ${accessToken}`;
    config.headers.common['x-access-token'] = accessToken;
    return config;
  },
  (error) => Promise.reject(error),
);

function fetchUser() {
  AsyncStorage.getItem('idToken').then((idToken) => {
    const data = JSON.stringify({
      idToken,
    });

    const url = `${Config.API_URL}/Authentication/auth0-user/`;
    return userApiClient.post(url, data, this.headers).then((response) => {
      if (in200s(response.status)) {
        return response.data;
      }

      return null;
    });
  });
}

function fetchKeywords() {
  const url = `${Config.API_URL}/keywords/get-for-user/`;

  return userApiClient.get(url, this.headers).then((response) => {
    if (in200s(response.status)) {
      return response.data;
    }
    return [];
  });
}

function saveDevice() {
  AsyncStorage.getItem('deviceToken').then((token) => {
    const data = JSON.stringify({
      Token: token,
      Info: '',
    });

    const url = `${Config.API_URL}/user/device/save`;
    return userApiClient.post(url, data, this.headers).then((response) => {
      if (in200s(response.status)) {
        return response.data;
      }
      return null;
    });
  });
}

export const userService = {
  fetchUser,
  saveDevice,
  fetchKeywords,
};
