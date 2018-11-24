/* mbed Microcontroller Library
 * Copyright (c) 2006-2013 ARM Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#ifndef __BLE_LED_SERVICE_H__
#define __BLE_LED_SERVICE_H__

class LEDService {
public:
    const static uint16_t LED_SERVICE_UUID              = 0xA000;
    const static uint16_t LED1_STATE_CHARACTERISTIC_UUID = 0xA001;
    const static uint16_t LED2_STATE_CHARACTERISTIC_UUID = 0xA002;
    const static uint16_t LED3_STATE_CHARACTERISTIC_UUID = 0xA003;
    const static uint16_t LED4_STATE_CHARACTERISTIC_UUID = 0xA004;

    LEDService(BLEDevice &_ble, bool initialValueForLEDCharacteristic) :
        ble(_ble), led1State(LED1_STATE_CHARACTERISTIC_UUID, &initialValueForLEDCharacteristic),
        led2State(LED2_STATE_CHARACTERISTIC_UUID, &initialValueForLEDCharacteristic),
        led3State(LED3_STATE_CHARACTERISTIC_UUID, &initialValueForLEDCharacteristic),
        led4State(LED4_STATE_CHARACTERISTIC_UUID, &initialValueForLEDCharacteristic)
    {
        GattCharacteristic *charTable[] = {&led1State, &led2State, &led3State, &led4State};
        GattService         ledService(LED_SERVICE_UUID, charTable, sizeof(charTable) / sizeof(GattCharacteristic *));
        ble.addService(ledService);
    }

    GattAttribute::Handle_t getLed1Handle() const
    {
       return led1State.getValueHandle();
    }

    GattAttribute::Handle_t getLed2Handle() const
    {
        return led2State.getValueHandle();
    }

     GattAttribute::Handle_t getLed3Handle() const
    {
        return led3State.getValueHandle();
    }
    
    GattAttribute::Handle_t getLed4Handle() const
    {
        return led4State.getValueHandle();
    }   

private:
    BLEDevice                         &ble;
    ReadWriteGattCharacteristic<bool> led1State;
    ReadWriteGattCharacteristic<bool> led2State;
    ReadWriteGattCharacteristic<bool> led3State;
    ReadWriteGattCharacteristic<bool> led4State;    
};

#endif /* #ifndef __BLE_LED_SERVICE_H__ */
