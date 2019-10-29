# DALI Application, Social Media Backend/API Challenge


## Overview
This API is a platform for collecting and distributing data about the members of the DALI Lab. This README will review the including endpoints included in this API. Before continuing, be sure you are aware of the data being used, 
[see here](./data/data.md). For more information about the LinkedIn scraping, or other aspects of the implementation, [see here](./implementation.md). 

# Endpoints 

## Basic Data Retrieval 
-------------
Show members
----
  Returns json data about all DALI members

* **URL**

  /members

* **Method:**

  `GET`
  
*  **Qeury Params**  
     - None: Returns all data for all members  
     
     - `?fields=name,year,phoneType`:
   Any comma separated list of valid member fields, see [here](./data/data.md) for all valid fields. Will return data for all members, with only the specified fields. 


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
  {
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
      }
    ]
  },
  {
    "name": "Jasmine Mai",
    "year": "'20",
    "picture": "https://api.typeform.com/responses/files/1fbd3a5a0c7c84062b88ee2c6af2dff06af0edc30e316b0086c1389fff2faf4a/IMG_5087.jpg",
    "gender": "Female",
    "American Indian or Alaska Native": "",
    "Asian": "Asian",
    "Black or African American": "",
    "Hispanic or Latino": "",
    "Middle Eastern": "",
    "Native Hawaiian or Other Pacific Islander": "",
    "White": "",
    "Other": "",...`
 


  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid field: field" }`

* **Sample Call:**

    Request: `/members/?fields=name,year`  
    Response:
  ```json
    [
    {
    "name": "Justin Luo",
    "year": "'20"
    },
    {
    "name": "Jasmine Mai",
    "year": "'20"
    },
    {
    "name": "Mira Ram",
    "year": "'20"
    },...
    ]
  ```

---------
  **Show Member**
----
  Returns json data about a single member.

* **URL**

  /users/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=member_id`
*  **Qeury Params**  
     - None: Returns all data for all members  
     
     - `?fields=name,year,phoneType`:
   Any comma separated list of valid member fields, see [here](./data/data.md) for all valid fields. Will return data for the member, with only the specified fields. 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
  "name": "Jasmine Mai",
  "year": "'20",
  "picture": "https://api.typeform.com/responses/files/1fbd3a5a0c7c84062b88ee2c6af2dff06af0edc30e316b0086c1389fff2faf4a/IMG_5087.jpg",
  "gender": "Female",
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
  "modification": "Digital Arts",
  "birthday": "5/2/98",
  "role": "Developer",
  "home": "San Francisco, CA",
  "quote": "\"Adventure is out there!\" - Up",
  "favoriteShoe": "Running shoes",
  "favoriteArtist": "Ariana Grande",
  "favoriteColor": "Blue",
  "phoneType": "iOS",
  "id": 1,
  "jobs": [
    {
      "extra": "Software Engineer\n DALI Lab is an innovative startup-like experiential learning program where students work in teams\nof designers and developers to build digital applications to real problems.\n Worked on Blabl, a mobile application using Amazon’s APIs to help kids with speech impediments\npractice speaking. Additional components include a Flask server that uses machine learning to\nanalyze users' speech, a Redux web app to display the analytics of users to their parents, and an\nAlexa skill companion app.\n Currently working on a virtual reality application that will enable users to see through the\nperspective of a tarsier monkey\nDALI\nDALI\n",
      "location": "Hanover, New Hampshire",
      "company_name": "DALI Lab",
      "dates": "Sep 2018 – Present",
      "duration": "1 yr 2 mos",
      "title": "Software Engineer",
      "job_id": 0
    }
  ]
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User id not found" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error:"Invalid field: field" }`

* **Sample Call:**
    request: `/members/1?fields=name,favoriteColor`
```json
{
  "name": "Jasmine Mai",
  "favoriteColor": "Blue"
}  
```
request: `/members/1`
```json
{
  "name": "Jasmine Mai",
  "year": "'20",
  "picture": "https://api.typeform.com/responses/files/1fbd3a5a0c7c84062b88ee2c6af2dff06af0edc30e316b0086c1389fff2faf4a/IMG_5087.jpg",
  "gender": "Female",
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
  "modification": "Digital Arts",
  "birthday": "5/2/98",
  "role": "Developer",
  "home": "San Francisco, CA",
  "quote": "\"Adventure is out there!\" - Up",
  "favoriteShoe": "Running shoes",
  "favoriteArtist": "Ariana Grande",
  "favoriteColor": "Blue",
  "phoneType": "iOS",
  "id": 1,
  "jobs": [
    {
      "extra": "Software Engineer\n DALI Lab is an innovative startup-like experiential learning program where students work in teams\nof designers and developers to build digital applications to real problems.\n Worked on Blabl, a mobile application using Amazon’s APIs to help kids with speech impediments\npractice speaking. Additional components include a Flask server that uses machine learning to\nanalyze users' speech, a Redux web app to display the analytics of users to their parents, and an\nAlexa skill companion app.\n Currently working on a virtual reality application that will enable users to see through the\nperspective of a tarsier monkey\nDALI\nDALI\n",
      "location": "Hanover, New Hampshire",
      "company_name": "DALI Lab",
      "dates": "Sep 2018 – Present",
      "duration": "1 yr 2 mos",
      "title": "Software Engineer",
      "job_id": 0
    }
  ]
}
```
