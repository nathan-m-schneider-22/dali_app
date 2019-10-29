/**
 * Nathan Schneider schnei.nathan@gmail.com
 * 10/23/19 v1.0
 * 
 * routes.js
 * This file contains several routes beyond the normal data retrieval 
 * of the main app.js. These routes will serve to help users analyze the
 * data further, and draw more insights. 
 */

module.exports = function(app,data){

    /**
     * This method takes a specific attribute, and takes a count of each distinct
     * value of this attribute. It returns this as a list of objects with two fields,
     * the attribute value, and the count it appears within the dataset. 
     * 
     * This function iterates through the members, builds attribute counts then 
     * returns them as json. 
     */
    app.get('/members/count/:attribute', (req, res) => {
        var attribute_count_list = [] //creates a list for these value, count pairs
        for (var member of data){ //iterate through the data
            if (job_attribute_array.includes(req.params.attribute)){ //check if the attribute is for a member's job
                for (var job of member.jobs){
                    /**
                     * If you can't find the attribute in the attribute counting list, make a new entry
                     */
                    if (!attribute_count_list.find(current_job => current_job[req.params.attribute] === job[req.params.attribute])){
                        var item = {}
                        item[req.params.attribute] = job[req.params.attribute]
                        item.count = 0
                        attribute_count_list.push(item)
                        }

                    //add to that entry
                    attribute_count_list.find(current_job => current_job[req.params.attribute] === job[req.params.attribute]).count++
                }
            }
            /**
             * If you can't find the attribute in the attribute counting list, make a new entry
             */
            else if (member_attribute_array.includes(req.params.attribute)){//check if the attribute is for a member
                if (!attribute_count_list.find(val => val[req.params.attribute] === member[req.params.attribute])){
                    var item = {}
                    item[req.params.attribute] = member[req.params.attribute]
                    item.count = 0
                    attribute_count_list.push(item)
                }   
                //add to that entry
                attribute_count_list.find(val => val[req.params.attribute] === member[req.params.attribute]).count++    
            }

            else{ //if it is not for a job nor a member, it is an invalid attribute
                res.status(400).send(("Invalid attribute: " + attribute))
                return
            }
        }
        res.send((attribute_count_list))
    })
    /**
     * This route takes a set of query parameters, and returns a list of all the
     * members that fit those paramters, with names and ids. 
     * 
     * The user will submit in the URL a set of key,value pairs, and will receive a
     * list of all DALI members that match all of these key,value conditions
     */
    app.get('/members/match/', (req, res) => {
        var matching_members = [] //list of members
        for (var member of data){
            var matching = true //we set a boolean to be true, and it will be falsified if it fails any of the matches
            for (var attribute in req.query){ //iterate through the matching fields

                if (job_attribute_array.includes(attribute)){ //job related fields
                    if (!member.jobs.map((job) => job[attribute]).includes(req.query[attribute])){
                        matching = false //if the member doesn't match, mark as false
                    }
                }
                else if (member_attribute_array.includes(attribute)){ //member fields
                    if(member[attribute] !== req.query[attribute]){
                    matching = false //if the member doesn't match, mark as false
                    }
                }
                else { //invalid fields, neither in jobs nor members   
                    if (!(attribute in member)){
                        res.status(400).send("Invalid attribute: "+attribute)
                        return
                    }
                }
            } //if the member is still matching after all attributes, add them to the list
            if (matching) matching_members.push({name:member.name , id: member.id})
        }
        res.send((matching_members))
    })

}