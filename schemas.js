var Joi = require('joi')

job_attribute_array = ["extra","company_name","dates","dates","duration","location","title","job_id"]
//Schemas here
const job_schema = Joi.object().keys({
    extra: Joi.string(),
    company_name: Joi.string(),
    dates: Joi.string(),
    duration: Joi.string(),
    location: Joi.string().optional(),
    title: Joi.string()
})
member_attribute_array = ["name","picture","year","gender","Asian",
"White","Other","major","minor","modification","birthday","role",",home",
"quote","favoriteShoe","favoriteArtist","favoriteColor",
"phoneType","American Indian or Alaska Native",
"Black or African American","Middle Eastern","Native Hawaiian or Other Pacific Islander",
"Hispanic or Latino","modification","jobs","id"]

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
  birthday: Joi.string(),
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
  jobs: Joi.array().items(job_schema)
  
})



module.exports = {member_schema,job_schema,job_attribute_array,member_attribute_array}