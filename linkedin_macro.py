"""
linkedin_macro.py


"""
import pyautogui
import time
print('Press Ctrl-C to quit.')

import json
jfile = open("DALI_DATA.json")
obs = json.loads(jfile.read())


time.sleep(5)
i=0
print(pyautogui.position())
sleeptime = 10
caught = False
try:
    while True:
        for member in obs:
            pyautogui.click(364,163)
            pyautogui.click(364,163)
            pyautogui.click(364,163)
            name = member["name"]
            print(name)

            if not caught and i<=60:
                i+=1
                continue
            caught = True
            pyautogui.typewrite(name + " Dali Dartmouth")
            pyautogui.press('enter')
            time.sleep(sleeptime)
            pyautogui.click(408,380)
            time.sleep(sleeptime)

            pyautogui.scroll(-1500)
            time.sleep(sleeptime)
            pyautogui.keyDown('ctrl')
            pyautogui.keyDown('s')
            pyautogui.keyUp('s')
            pyautogui.keyUp('ctrl')
            time.sleep(3)
            pyautogui.typewrite(name.replace(" ","_"))
            time.sleep(.5)
            pyautogui.press('enter')
            time.sleep(sleeptime)
            print(i)
            i+=1
        exit(0)
except KeyboardInterrupt:
    print('\nDone.')