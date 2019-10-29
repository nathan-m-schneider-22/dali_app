# Data Overview

## Member Object
The member objects are the same as were imported as part of the DALI_Data.json, with two main differences. 
 - The addition of a UNIQUE member id for reference
 - The addition of a list of jobs (see below)
This data is of the form: 
```json {
  "name": "Justin Luo",
  "year": "'20",
  "picture": "https://api.typeform.com/responses/files/30e6cf1283ab1600d4a9778bd0853a7ef0ecffcd660652e875bfc45fdc214af3/IMG_0152.jpg",
  "gender": "Male",
  "American Indian or Alaska Native": "",
  "Asian": "Asian",
  "Black or African American": "",
  "Hispanic or Latino": "",
  "Middle Eastern": "",
  "Native Hawaiian or Other Pacific Islander": "",
  "White": "",
  "Other": "",
  "major": "Computer Science",
  "minor": "",
  "modification": "",
  "birthday": "7/27/98",
  "role": "Designer",
  "home": "Germantown, WI",
  "quote": "\"Don't cry because it's over, smile because it happened.\" - Seuss",
  "favoriteShoe": "Allbirds",
  "favoriteArtist": "Cage the Elephant",
  "favoriteColor": "Blue",
  "phoneType": "iOS",
  "id": 0,
  "jobs": [
    {
      "extra": " Guide students through projects in AR (Vuforia) and VR (Oculus SDK)\n Build and update course exercises and foundation tutorials for Unity and Maya.\n Lead students toward delightful solutions to class projects, including a futuristic digital project, a\nphysical carrying device, and a Dartmouth improvement project\n Facilitate learning sessions on the various parts of the design thinking process, including user\nresearch, brainstorming, prototyping, and user feedback\n",
      "location": "Hanover, NH",
      "company_name": "Dartmouth College",
      "duration": "1 yr 8 mos",
      "title": "Design Thinking Teaching Assistant",
      "dates": "Mar 2018 – Present",
      "job_id": 0
    },
    {
      "extra": "Designer | Developer\n Collaborate with developers and other designers to create mobile and web applications for\npartner projects\n Designed user flow and UI assets for a mobile application that aimed to encouraged discussion of\nmental health issues (Unmasked)\n",
      "location": "Hanover, New Hampshire",
      "company_name": "DALI Lab",
      "dates": "Mar 2017 – Present",
      "duration": "2 yrs 8 mos",
      "title": "Designer | Developer",
      "job_id": 1
    }
  ]
}
```
## Job Object
The member object contains an array of jobs. These jobs consist of the following fields: 
 - extra: The buzzwords and statements written about this job by the member of the DALI Lab
 - location: The stated location from the LinkedIn page (sometimes absent)
 - company name
 - dates: dates employed, or dates volunteered
 - duration: work time, listed in years and months
 - title: title of their position
 - a UNIQUE job id assigned during parsing
 ```json  
    "extra": "Designer | Developer\n Collaborate with developers and other designers to create mobile and web applications for\npartner projects\n Designed user flow and UI assets for a mobile application that aimed to encouraged discussion of\nmental health issues (Unmasked)\n",
    "location": "Hanover, New Hampshire",
    "company_name": "DALI Lab",
    "dates": "Mar 2017 – Present",
    "duration": "2 yrs 8 mos",
    "title": "Designer | Developer",
    "job_id": 1
```