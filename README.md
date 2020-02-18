# U-Con Mobile

### Android Environment
This assumes you have the dependencies referenced in the [React Native CLI Quickstart](https://facebook.github.io/react-native/docs/getting-started). 
My environment includes the following versions:
* *node v10.18.1*
* *npm 6.13.4*
* *javac 1.8.0_231*
* *python 2.7.17*

### Starting the Project on Windows
The following commands should start the project Windows using Android Studio:

1. git clone https://github.com/JaBray/UConMobileApp.git
1. cd UConMobileApp/ReactNative
1. npm install
1. launch android studio and start a device emulator
1. npx react-native run-android

*Ebrahim*, you can try this with **npx react-native run-ios** but I don't guarantee it will work. If you get it to work, let us know.

### Recreate Steps
You shouldn't need to recreate the application from scratch but, just to record how it was created, I wanted to list the steps here.
1. npx react-native init UConMobile
1. cd UConMobile
1. npm install eslint@^5.0.0
1. npm install typescript
1. npm install @react-native-community/async-storage --save
1. npm install react-native-rsa-native --save
1. copy the following files and folders from the GitHub project into the newly created project:
    * /components
    * /images
    * App.js

After that you can start the android emulator and run **npx react-native run-android**. Ebrahim, you might be able to run **npx react-native run-ios** but I'm not positive it will work.

### Dependencies
I installed *eslint* and *typescript* simply to remove warnings about missing dependencies. We could probably remove them an any packages that depend on them, but for now this was easier.

#### AsyncStorage
@react-native-community/async-storage v1.8.0 is a standard library for storing data on the device. This storage is unencrypted. Encryption is handled separately. More information is available here **https://github.com/react-native-community/async-storage**

#### RSA Encryption
react-native-rsa-native v1.1.4 is a library for encrypting strings using a public/private key. At the moment, the public/private key is in our code, but I'm hoping to find a way to move it out, perhaps using a TLS certificate. We may be able to store the public key on the device and send credentials encrypted, then decrypt on the backend. This would require finding out how to decrypt in PHP. More information about this library is here **https://github.com/amitaymolko/react-native-rsa-native**
