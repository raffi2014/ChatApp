import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import { NativeModules } from 'react-native';

let reactotron;

if(__DEV__) {
    const host = NativeModules.SourceCode.scriptURL
        ?.split("://")[1]
        ?.split(":")[0];
    console.log(host);
    Reactotron
  .configure({
    host
  })
  .use(reactotronRedux())
  .useReactNative() // add all built-in react native plugins
  .connect();
}

export default reactotron;