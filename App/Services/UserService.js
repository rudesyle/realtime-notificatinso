import axios from 'axios'
import { Config } from 'App/Config'
import { is, curryN, gte } from 'ramda'
import DeviceStorage from 'App/Services/DeviceStorage'; 
import AsyncStorage from '@react-native-community/async-storage';

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number)
  return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
})
const in200s = isWithin(200, 299)

const IdToken = async () => {
  try {
    await AsyncStorage.getItem("idToken").then(
      token => token
    );
  } catch (error) {
    return null;
  }
}
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

const userApiClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-application':'https://qa.realtimemed.com'
  },
  timeout: 3000,
})

userApiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    config.headers.authorization = 'Bearer ' + accessToken;
    config.headers.common['x-access-token'] = accessToken;
    return config;
  },
  error => Promise.reject(error)
);

function fetchUser() {
  AsyncStorage.getItem("idToken").then((idToken) => {
    const data = JSON.stringify({
      'idToken': idToken
    });

    return userApiClient.post(Config.API_URL,data,this.headers).then((response) => {
      
      if (in200s(response.status)) {
        return response.data
      }

      return null
    })
  });
}


export const userService = {
  fetchUser,
}
