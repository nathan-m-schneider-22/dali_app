
module.exports = function(app,data){

    app.get('/members/count/:attribute', (req, res) => {
        var attribute_count_list = []
        for (var member of data){
            if (job_attribute_array.includes(req.params.attribute)){
                for (job of member.jobs){
                    if (!attribute_count_list.find(current_job => current_job[req.params.attribute] === job[req.params.attribute])){
                        var item = {}
                        item[req.params.attribute] = job[req.params.attribute]
                        item.count = 0
                        attribute_count_list.push(item)
                        }
                    attribute_count_list.find(current_job => current_job[req.params.attribute] === job[req.params.attribute]).count++
                }
            }
            else if (member_attribute_array.includes(req.params.attribute)){
                if (!attribute_count_list.find(val => val[req.params.attribute] === member[req.params.attribute])){
                    var item = {}
                    item[req.params.attribute] = member[req.params.attribute]
                    item.count = 0
                    attribute_count_list.push(item)
                }   
                attribute_count_list.find(val => val[req.params.attribute] === member[req.params.attribute]).count++    
            }
            else{
                res.status(400).send("Invalid attribute: "+attribute)
                return
            }
        }
        res.send((attribute_count_list));
    });
    
    app.get('/members/match/', (req, res) => {
        var matching_members = []
        for (var member of data){
            var matching = true
            for (attribute in req.query){
                if (job_attribute_array.includes(attribute)){
                    if (!member.jobs.map((job) => job[attribute]).includes(req.query[attribute])){
                        matching = false
                    }
                }
                else if (member_attribute_array.includes(attribute)){
                    if(member[attribute] !== req.query[attribute]){
                    matching = false
                    }
                }
                else {
                    if (!(attribute in member)){
                        res.status(400).send("Invalid attribute: "+attribute)
                        return
                    }
                }
            }
            if (matching) matching_members.push({name:member.name , id: member.id})
        }
        res.send((matching_members));
    });

}