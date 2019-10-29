# DALI Application, Social Media Backend/API Challenge


## Overview
This API is a platform for collecting and distributing data about the members of the DALI Lab, as well as member data from LinkedIn. This README will review the including endpoints included in this API. Before continuing, be sure you are aware of the data being used, 
[see here](./data/data.md). For more information about the LinkedIn scraping, or other aspects of the implementation, [see here](./implementation.md). 

# Endpoints 

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
   Any comma separated list of valid job fields, see [here](./data/data.md) for all valid fields. Will return data for all members, with only the specified fields. 


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
    Response: (truncated)
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
    },
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
 
   `id=member_id` valid member id
*  **Qeury Params**  
     - None: Returns all data for the member  
     
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
---------
  **Show Member Jobs**
----
  Returns json data about a single member's jobs.

* **URL**

  /users/:id/jobs

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=member_id` valid member id
*  **Qeury Params**  
     - None: Returns all data all jobs  
     
     - `?fields=title,company_name,duration`:
   Any comma separated list of valid job fields, see [here](./data/data.md) for all valid fields. Will return data for the job, with only the specified fields. 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** (truncated) `{
  [
    {
      "extra": "Software Engineer\n DALI Lab is an innovative startup-like experiential learning program where students work in teams\nof designers and developers to build digital applications to real problems.\n Worked on Blabl, a mobile application using Amazon’s APIs to help kids with speech impediments\npractice speaking. Additional components include a Flask server that uses machine learning to\nanalyze users' speech, a Redux web app to display the analytics of users to their parents, and an\nAlexa skill companion app.\n Currently working on a virtual reality application that will enable users to see through the\nperspective of a tarsier monkey\nDALI\nDALI\n",
      "location": "Hanover, New Hampshire",
      "company_name": "DALI Lab",
      "dates": "Sep 2018 – Present",
      "duration": "1 yr 2 mos",
      "title": "Software Engineer",
      "job_id": 0
    },...
  ]
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User id not found" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error:"Invalid field: field" }`

* **Sample Call:**
    request: `/members/1/jobs?fields=title,company_name`
```json
[
  {
    "title": "Software Engineer",
    "company_name": "DALI Lab"
  },
  {
    "title": "Software Engineering Intern",
    "company_name": "Qualtrics"
  },
  {
    "title": "Web Development Intern",
    "company_name": "Open Data Kosovo"
  },
  {
    "title": "Introduction to Programming and Computation Section Leader",
    "company_name": "Dartmouth College"
  }
]
```
---------
  **Show Specific Member Job**
----
  Returns json data about a single member's specific job

* **URL**

  /users/:id/jobs/:job_id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=member_id` valid member id

   `job_id` valid job id

*  **Qeury Params**  
     - None: Returns all data for the job  
     
     - `?fields=title,company_name,duration`:
   Any comma separated list of valid job fields, see [here](./data/data.md) for all valid fields. Will return data for the job, with only the specified fields. 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** (full) `{
  [
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

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Job id not found" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error:"Invalid field: field" }`

   
* **Sample Call:**
    request: `/members/1/jobs/1?fields=title,company_name`
```json

  {
    "title": "Software Engineering Intern",
    "company_name": "Qualtrics"
  }

```
request: `/members/1/jobs/1`

```json
{
  "extra": "Software Engineering Intern\n In charge of designing and implementing a Java program that takes Open API Specifications and\ngenerates API clients for 3rd party developers to be able to use the Qualtrics API more easily.\n A primary goal of this project is to make API clients easy to maintain while also ensuring that\ndeveloper experience is smooth and easy.\n",
  "location": "Seattle, WA",
  "company_name": "Qualtrics",
  "dates": "Jun 2019 – Aug 2019",
  "duration": "3 mos",
  "title": "Software Engineering Intern",
  "job_id": 1
}
```
-----------
**Add Member**
----
  Add a new DALI Lab member to the data set

* **URL**

  /users/

* **Method:**

  `POST`

*  **URL Params**


* **Data Params**

  Data must be in a JSON in the form specified by the Joi Schema used to validate. See [implementation](./implementaion.md) and [data format](./data/data.md) for more. All fields are required for POST

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `({message: "DALI member added", id:(new_id)})`
 
* **Error Response:**

     If there are any missing fields, the request will be rejected. If there are any extra fields, these will be rejected. If any fields differ from the [Joi Schema](./schemas.js) the request will be rejected. 

* **Code:** 400 BAD REQUEST <br />
  **Content:** `    "isJoi": true,
"name": "ValidationError",
"details": [
  {
    "message": "\"year\" is required",
    "path": [
      "year"
    ],
    "type": "any.required",
    "context": {
      "key": "year",
      "label": "year"
    }
  }
],
`

* **Sample Call:**

Request: `/members/1`  
Body: 

```json     
 {
      "name": "Nathan Schneider",
      "year": "'22",
			"gender": "Male",
      "picture": "https://api.typeform.com/responses/files/c5f9719d9453133b1e954af096f540987b955f30ab1e63cfc6005ad8634e5a8f/JOHN.jpg",
      "American Indian or Alaska Native": "",
      "Asian": "",
      "Black or African American": "",
      "Hispanic or Latino": "",
      "Middle Eastern": "",
      "Native Hawaiian or Other Pacific Islander": "",
      "White": "White",
      "Other": "",
      "major": "Computer Science ",
      "minor": "",
      "modification": "",
      "birthday": "12/12/99",
      "role": "Developer",
      "home": "Lyons, CO",
      "quote": "\"Go big then go home.\"",
      "favoriteShoe": "Sportiva Finales",
      "favoriteArtist": "Hobo Johnson",
      "favoriteColor": "Blue",
      "phoneType": "iOS",
      "jobs": [
        
      ]
    }

```
response: 

```json 
{
  "message": "DALI member added",
  "id": 67
}
```

-----------
**Add Job**
----
  Add a job to a specific member

* **URL**

  /users/:id/jobs

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `:id=member_id` valid member id

* **Data Params**

  Data must be in a JSON in the form specified by the Joi Schema used to validate. See [implementation](./implementaion.md) and [data format](./data/data.md) for more. 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{message:'Job updated with id', job_id: job_id}`
 

* **Error Response:**
* **Code:** 404 NOT FOUND <br />
**Content:** `{ error : "User id not found" }`

OR

If there are any fields missing from the request body, they will be rejected and displayed in the error. If there are any extra fields, these will also be rejected. If any fields differ from the [Joi Schema](./schemas.js) the request will be rejected. 

* **Code:** 400 BAD REQUEST <br />
**Content:** `{
  "isJoi": true,
  "name": "ValidationError",
  "details": [
    {
      "message": "\"company_name\" is required",
      "path": [
        "company_name"
      ],
      "type": "any.required",
      "context": {
        "key": "company_name",
        "label": "company_name"
      }
    }
  ]
`

* **Sample Call:**

    Request: `/members/1/jobs/1`  
    Body: 
```json    
{
	
   "extra": "Project Manager\nEach term I manage a group of students, developers and designers, in making a product for our\npartner, which changes term to term. ",
    "company_name": "DALI Lab",
    "dates": "Jan 2019 – Present",
    "duration": "10 mos",
    "location": "Hanover, NH",
    "title": "Project Manager"
  }
```
response: 

```json 
{
  "message": "Job added Sucessfully",
  "job_id": 5
}
```

-----------
**Edit Member**
----
  Edit the data of a current member of the DALI Lab

* **URL**

  /users/:id

* **Method:**

  `PATCH`

*  **URL Params**

   **Required:**
 
   `:id=member_id` valid member id


* **Data Params**

  Data must be in a JSON in the form specified by the Joi Schema used to validate. See [implementation](./implementaion.md) and [data format](./data/data.md) for more. All fields are required for POST

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `({message:"Member updated", id : member_id})`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User id not found" }`

  If there are any extra fields, these will be rejected. If any fields differ from the [Joi Schema](./schemas.js) the request will be rejected. 

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `  "isJoi": true,
  "name": "ValidationError",
  "details": [
    {
      "message": "\"extra-field\" is not allowed",
      "path": [
        "extra-field"
      ],
      "type": "object.allowUnknown",
      "context": {
        "child": "extra-field",
        "value": "extra-value",
        "key": "extra-field",
        "label": "extra-field"
      }
    }
  ],
`

* **Sample Call:**

Request: `/members/1`  
Body: 

```json     
{
	"name" : "Phil Hanlon",
	"year": "77"
}```
response: 

```json 
{
  "message": "Member updated",
  "id": "1"
}
```

-----------
**Edit Job**
----
  Edit a specific job of a specific member

* **URL**

  /users/:id/jobs/:job_id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `:id=member_id` valid member id   
   `:job_id` valid job id for member
* **Data Params**

  Data must be in a JSON in the form specified by the Joi Schema used to validate. See [implementation](./implementaion.md) and [data format](./data/data.md) for more. All fields are required for POST.

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{message:'Job updated with id', job_id: job_id}`
 
* **Error Response:**
* **Code:** 404 NOT FOUND <br />
**Content:** `{ error : "User id not found" }`

OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Job id not found" }`  

OR

If there are any fields missing from the request body, they will be rejected and displayed in the error. If there are any extra fields, these will also be rejected. If any fields differ from the [Joi Schema](./schemas.js) the request will be rejected. 

* **Code:** 400 BAD REQUEST <br />
**Content:** `{
  "isJoi": true,
  "name": "ValidationError",
  "details": [
    {
      "message": "\"roll\" is not allowed",
      "path": [
        "roll"
      ],
      "type": "object.allowUnknown",
      "context": {
        "child": "roll",
        "value": "Time waster",
        "key": "roll",
        "label": "roll"
      }
    }
  ],
`

* **Sample Call:**

    Request: `/members/1/jobs/1`  
    Body: 
```json    
{
	"title" : "Time waster",
	"location": "Deep stacks"
}
```
response: 

```json 
{
  "message": "Job updated with id",
  "job_id": "1"
}
```

--------
**Delete Member**
----
  Removes a Member from the DALI Lab data

* **URL**

  /users/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=user_id` a valid user id

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{message:'Member Deleted',id:member.id}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User id not found" }`


* **Sample Call:**  
request: `/members/1`  
response: 
```json
{
  "message": "Member Deleted",
  "id": "1"
} 
```
--------
**Delete Job**
----
  Removes a job from one DALI Lab member

* **URL**

  /users/:id/jobs/:job_id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=user_id` a valid user id  
   `job_id` a valid job id

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{message:"Job Deleted", id: job_id}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User id not found" }`  

OR
  
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{error:"Job id not found"}`


  
* **Sample Call:**  
request: `/members/1/jobs/1`  
response: 
```json
{
  "message": "Job Deleted",
  "job_id": "1"
}
```
--------
**Count Attributes**
----
This method takes a specific attribute, and takes a count of each distinct
value of this attribute. It returns this as a list of objects with two fields,
the attribute value, and the count of times it appears within the dataset
* **URL**

  /members/count/:attribute

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `attribute=[string]` a valid field for either member or job schemas


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
  {
    "phoneType": "iOS",
    "count": 56
  },
  {
    "phoneType": "Other",
    "count": 1
  },
  {
    "phoneType": "Android",
    "count": 9
  }
]`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid field: field" }`

* **Sample Call:**
request: `members/count/year`  
response:  

```json
[
  {
    "year": "'20",
    "count": 23
  },
  {
    "year": "'19",
    "count": 24
  },
  {
    "year": "'21",
    "count": 12
  },
  {
    "year": "'22",
    "count": 7
  }
] 
```
--------
**Match Attributes**
----
The user will submit in the URL a set of key,value pairs, and will receive a
list of all DALI members that match all of these key,value conditions
* **URL**

  /members/match/

* **Method:**

  `GET`
  
*  **Query Params**

 
   `field=value` any and all valid fields, with any values


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
  {
    "name": "Wylie Kasai",
    "id": 9
  },
  {
    "name": "Sara Falkson",
    "id": 15
  },
  {
    "name": "Gillian Yue",
    "id": 23
  },
  {
    "name": "Zirui Hao",
    "id": 39
  },
  {
    "name": "Donia Tung",
    "id": 45
  },
  {
    "name": "Sara S. Kim",
    "id": 62
  },
  {
    "name": "John McCambridge",
    "id": 64
  }
]`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid field: field" }`

* **Sample Call:**
request: `members/match?year='22&phoneType=iOS`  
response:  

```json
[
  {
    "name": "Wylie Kasai",
    "id": 9
  },
  {
    "name": "Sara Falkson",
    "id": 15
  },
  {
    "name": "Gillian Yue",
    "id": 23
  },
  {
    "name": "Zirui Hao",
    "id": 39
  },
  {
    "name": "Donia Tung",
    "id": 45
  },
  {
    "name": "Sara S. Kim",
    "id": 62
  },
  {
    "name": "John McCambridge",
    "id": 64
  }
]
```
---------
