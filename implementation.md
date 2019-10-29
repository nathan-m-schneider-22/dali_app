# Implementaion 

## LinkedIn Data
The LinkedIn data was collected and parsed using Python. The data given for the challenge was small, and limited in scope. I decided to expand on the set, with the resources I was given. With the names of each DALI member and the fact they worked at DALI, I was able to find every DALI member as the first search result in a LinkedIn search. Unfortunately, I was unable to use the LinkedIn Profile API due to "privacy concerns" so "The use of this API is restricted to those developers approved by LinkedIn". As such, a simpler solution was found: a macro, using `PyAutoGUI`. In [the macro](./linkedin_macro.py) the names from the source JSON file are searched through my laptop, and the profile pages downloaded directly into the data directory. The macro completed in 30 minutes, only missing one DALI Lab member, Cat Zhao who was listed on LinkedIn as Catherine. This solution, while effective, is not ideal, and would not scale (and might not be entirely within LinkedIn guidelines). 
  
The next step was to parse the HTML into job data. This was done with the [parser](./linkedin_data_parser.py). This takes the original JSON data file, strips the HTML file for each name, and creates a new JSON with a list of jobs added to the member's data. 

## RESTful API
The API was implemented in Javascript using primarily the `express` library. This provided the framework for routes, requests, and responses. Input validation was implemented using `Joi`. `Joi` is a library that allows objects to be validated against preset [schemas](./schemas.js). Each field in the Schema object has specific charcateristics as can be seen here. If an input differs from these set rules, Joi rejects this input.
``` javascript 
const job_schema = Joi.object().keys({
    extra: Joi.string().allow(""),
    company_name: Joi.string(),
    dates: Joi.string(),
    duration: Joi.string(),
    location: Joi.string().allow(""),
    title: Joi.string()
})
```
