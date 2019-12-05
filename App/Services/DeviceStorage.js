import AsyncStorage from '@react-native-community/async-storage';

const DeviceStorage = {
  async deleteJWT() {
    try{
      await AsyncStorage.removeItem('idToken')
      .then(
        () => {
          this.setState({
            jwt: ''
          })
        }
      );
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async loadJWT() {
    try {
      const value = await AsyncStorage.getItem('idToken');
      if (value !== null) {
        this.setState({
          jwt: value,
          loading: false
        });
      } else {
        this.setState({
          loading: false
        });
      }
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      console.log('Key : ' + key + ' was removed');
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Key : ' + key + ', Value: '  + value);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

    logCurrentStorage() {
    AsyncStorage.getAllKeys().then((keyArray) => {
      AsyncStorage.multiGet(keyArray).then((keyValArray) => {
        let myStorage: any = {};
        for (let keyVal of keyValArray) {
          myStorage[keyVal[0]] = keyVal[1]
        }

        console.log('CURRENT STORAGE: ', myStorage);
      })
    });
  }
  
};

export default DeviceStorage;