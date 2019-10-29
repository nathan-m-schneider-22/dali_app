"""
linkedin_macro.py
Nathan Schneider 10/22/19
This program is a workaround to obtaining the linkedIn data
 for the members of the DALI Lab. For more explanation, please
 consult the documentation.
 This program performs a series of clicks and keystrokes with
 load time between in order to save the HTML of each LinkedIn page
 to my laptop, where it can be parsed. 
"""

import pyautogui
import time
import json

#Blanket load time per page operation
SLEEP_TIME = 10


#To read the names we need to search, we consult the .json. 
jfile = open("DALI_DATA.json")
member_dict = json.loads(jfile.read())

print('Press Ctrl-C to quit.')

#Time to switch tabs after starting
time.sleep(5)

try:
    for member in member_dict:
        
        #Focus and highlight search bar
        pyautogui.click(364,163)
        pyautogui.click(364,163)
        pyautogui.click(364,163)

        #Enter query
        name = member["name"]
        print(name)
        pyautogui.typewrite(name + " Dali Dartmouth")
        pyautogui.press('enter')

        #Load time
        time.sleep(SLEEP_TIME)

        #Click first result
        pyautogui.click(408,380)
        time.sleep(SLEEP_TIME)

        #Scroll down to load the work experience (not otherwise loaded)
        pyautogui.scroll(-1500)
        time.sleep(SLEEP_TIME)

        #Save the page as First_Last.html
        pyautogui.keyDown('ctrl')
        pyautogui.keyDown('s')
        pyautogui.keyUp('s')
        pyautogui.keyUp('ctrl')
        time.sleep(3)
        pyautogui.typewrite(name.replace(" ","_"))
        time.sleep(.5)
        pyautogui.press('enter')
        time.sleep(SLEEP_TIME)
        #Continue the loop
    print("FINISHED")
    
except KeyboardInterrupt:
    print('\Exited.')