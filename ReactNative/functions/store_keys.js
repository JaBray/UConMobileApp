import AsyncStorage from '@react-native-community/async-storage';
import { RSAKeychain  } from 'react-native-rsa-native';

// THIS STORES THE PUBLIC AND PRIVATE KEYS THAT ARE USED TO ENCRYPT/DECRYPT
// THE CREDENTIALS. IDEALLY, THESE WOULD NOT BE STORED ON THE DEVICE.
// PERHAPS THEY COULD BE RETRIEVED FROM A TLS CERTIFICATE.
export async function storeKeys() {
  const keyTag = 'org.ucon-gaming.key';
  await RSAKeychain.generate(keyTag);
  await AsyncStorage.setItem('keyTag', keyTag);
}
