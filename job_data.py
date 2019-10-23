from html.parser import HTMLParser
import json

data_list = []

class MyHTMLParser(HTMLParser):
    def handle_data(self, data):
        if data.strip()!= "":
            data_list.append(data.strip())

def get_job_list(member_name):
    parser = MyHTMLParser()
    f = open("member_jobs/%s.html" %(member_name.replace(" ","_")),encoding="utf8")
    sections = f.read().split("pv-profile-section__section-info")

    parser = MyHTMLParser()
    for s in sections:
        if ("Company Name" in s):
            parser.feed(s)

    all_jobs = []
    current_job = []

    index = data_list.index("Company Name")
    while index < len(data_list)-1:
        current_job.append(data_list[index])
        
        index += 1
        if data_list[index] == "Company Name":
            all_jobs.append(current_job)
            current_job = []
    all_jobs.append(current_job)
    job_dict_list = []
    for current_job in all_jobs:
        job_dict = {}
        job_dict["extra"] = ""
        i = 0 
        while i < len(current_job):
            if "company name" in current_job[i].lower():
                job_dict["company name"] = current_job[i+1]
                i+=1
            elif "duration" in current_job[i].lower():
                job_dict["duration"] = current_job[i+1]
                i+=1
            elif "location" in current_job[i].lower():
                job_dict["location"] = current_job[i+1]
                i+=1
            elif "dates" in current_job[i].lower():
                job_dict["dates"] = current_job[i+1]
                i+=1
            else:
                if not any(avoid in current_job[i] for avoid in ["See more","...",">","<","//"]):
                    job_dict["extra"] += "\n" + current_job[i]
            i+=1
        job_dict_list.append(job_dict)
    data_list.clear()
    return job_dict_list

jfile = open("DALI_DATA.json")
obs = json.loads(jfile.read())

for member in obs:
    name = member["name"]
    print(get_job_list(name))
    member["jobs"] = get_job_list(name)
    print(member["jobs"])

with open('job_data.json', 'w') as outfile:
    json.dump(obs, outfile)
