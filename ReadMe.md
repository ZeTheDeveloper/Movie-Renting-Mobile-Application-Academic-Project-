Step to launch this app

1. npm react-native run-android

if you faced error in configuration step
(java.util.concurrent.ExecutionException: com.android.builder.testing.api.DeviceException:
com.android.ddmlib.InstallException:
Unknown failure: Error: Failed to parse APK file: /data/local/tmp/app-debug.apk_)

navigate and delete this \
android/app/build/outputs/apk/debug/app-debug.apk


2. a new cmd to run server, in assets/api directory \
recommand to install your flask in cirtual mechine \
   (py -3 -m venv venv (run in a virtual env called venv)
   venv\Scripts\activate) \
2.1. py executeDB.py \
//create sqlite database and table \
2.2 py sqlite-server.py \
//to run flask server, keep it running

then you are good to go

/*
you will need to have a 
react-native @0.64.2
react@17.0.1
*/
