# Setup

 ```
  sudo apt-get install build-essentials cmake
 ```

[Git source](https://github.com/thomsten/nrf-blinky.git)

## Install Nordic Toolset

Goto [here](http://infocenter.nordicsemi.com/index.jsp?topic=%2Fcom.nordic.infocenter.tools%2Fdita%2Ftools%2Fnrf5x_command_line_tools%2Fnrf5x_installation.html)

Download the files and symlink
```
  sudo ln -s ~/Prog/mergehex/mergehex /usr/local/bin/mergehex
  sudo ln -s ~/Prog/nrfjprog/nrfjprog /usr/local/bin/nrfjprog
```

## Mbed OS

[Install docs](http://docs.yottabuild.org/#installing-on-linux)

## BLE Examples

```
  mbed compile -t GCC_ARM -m NRF52840_DK
```

[Git Repo](https://github.com/ARMmbed/mbed-os-example-ble.git)


## Cordova Setup

Most of the source files are installed but please install cordova and add platforms as well.

```
  cordova platform add ios
  cordova platform add android
```