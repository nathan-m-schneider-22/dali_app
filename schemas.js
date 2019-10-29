var Joi = require('joi')

/**
 * Nathan Schneider schnei.nathan@gmail.com
 * 10/23/19 v1.0
 * 
 * schemas.js
 * This file holds the schemas for the Joi input validation library
 * These schemas dictate what inputs are to be allowed in post and put
 * requests. With POST, all fields are required. With PUT, all fields are
 * optional
 */


//This job attribute array is a way for code to check valid field if all jobs have been deleted
job_attribute_array = ["extra","company_name","dates","dates","duration","location","title","job_id"]


//Job Schema, allowing empty inputs for location and extra, but if another field is included, it 
//cannot be empty
const job_schema = Joi.object().keys({
    extra: Joi.string().allow(""),
    company_name: Joi.string(),
    dates: Joi.string(),
    duration: Joi.string(),
    location: Joi.string().allow(""),
    title: Joi.string()
})

//This member attribute array is a way for code to check valid field if all members have been deleted
member_attribute_array = ["name","picture","year","gender","Asian",
"White","Other","major","minor","modification","birthday","role",",home",
"quote","favoriteShoe","favoriteArtist","favoriteColor",
"phoneType","American Indian or Alaska Native",
"Black or African American","Middle Eastern","Native Hawaiian or Other Pacific Islander",
"Hispanic or Latino","modification","jobs","id"]


//A mirror of the data set provided with the project
const member_schema = Joi.object().keys({
  name: Joi.string(),
  picture: Joi.string(),
  year: Joi.string(),
  gender: Joi.string(),
  Asian: Joi.string().allow(''),
  White:Joi.string().allow(''),
  Other:Joi.string().allow(''),
  major: Joi.string(),
  minor: Joi.string().allow(''),
  modification: Joi.string().allow(''),
  birthday: Joi.string().regex(/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/([0-9]{2})/), //date checking
  role: Joi.string(),
  home: Joi.string(),
  quote: Joi.string(),
  favoriteShoe: Joi.string(),
  favoriteArtist:Joi.string(),
  favoriteColor:Joi.string(),
  phoneType:Joi.string(),
  "American Indian or Alaska Native" : Joi.string().allow(''),
  "Black or African American": Joi.string().allow(''),
  "Middle Eastern":Joi.string().allow(''),
  "Native Hawaiian or Other Pacific Islander":Joi.string().allow(''),
  "Hispanic or Latino" : Joi.string().allow(''),
  jobs: Joi.array().items(job_schema)//including an array of past jobs
  
})

//export these to the app.js program
module.exports = {member_schema,job_schema,job_attribute_array,member_attribute_array}