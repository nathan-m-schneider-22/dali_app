"""
linkedin_data_parser.py
Nathan Schneider 10/22/19
This program parses saved HTML pages for each DALI lab's member's
linkedin account. It then saves their work experience as a list of 
dictionaries. This function can be called by other python files,
or run itself to parse all the members.
"""


from html.parser import HTMLParser
import json

#Global for easy access into the MyHTMLParser
data_list = []
#Path for html files

DATA_PATH = "./member_jobs/"
class MyHTMLParser(HTMLParser):
    def handle_data(self, data):
        if data.strip()!= "":
            data_list.append(data.strip())


#get_job_list takes a string of a name, and returns a list of dicts of their job experience
def get_job_list(member_name):

    parser = MyHTMLParser()

    #Open their file with underscores in UTF-8
    f = open("%s%s.html" %(DATA_PATH,member_name.replace(" ","_")),encoding="utf8")

    #LinkedIn orders their pages in profile sections, this delimiter lets us focus on the relevant sections
    sections = f.read().split("pv-profile-section__section-info")

    #We parse all sections (they come in many orders) as long as they have company experince
    #This includes volunteer experience
    for s in sections:
        if ("Company Name" in s):
            parser.feed(s)


    #Implement a list of lists to hold strings
    all_list_jobs = []
    current_list_job = []
    #Start at the first company (some junk in the section previous)
    index = data_list.index("Company Name")
    #Add lists of data strings to the job list of lists
    while index < len(data_list)-1:
        current_list_job.append(data_list[index])
        index += 1
        if data_list[index] == "Company Name":
            all_list_jobs.append(current_list_job)
            current_list_job = []
    all_list_jobs.append(current_list_job)

    #List of dicts we will be returning
    job_dict_list = []
    for current_list_job in all_list_jobs:
        #initalize the dictionary, establish the categories
        #We track company name, duration, location, dates, and extra
        #A category with descriptors and titles
        job_dict = {}
        job_dict["extra"] = ""
        i = 0 
        #Check the current string for relevancy (comes in multiple orders)
        while i < len(current_list_job):
            if "company name" in current_list_job[i].lower():
                job_dict["company name"] = current_list_job[i+1]
                i+=1
            elif "duration" in current_list_job[i].lower():
                job_dict["duration"] = current_list_job[i+1]
                i+=1
            elif "location" in current_list_job[i].lower():
                job_dict["location"] = current_list_job[i+1]
                i+=1
            elif "dates" in current_list_job[i].lower():
                job_dict["dates"] = current_list_job[i+1]
                i+=1
            else:
                #Add the descriptions as extra, except for junk/caught up HTML and links
                if not any(avoid in current_list_job[i] for avoid in ["See more","...",">","<","//"]):
                    job_dict["extra"] += "\n" + current_list_job[i]
            i+=1
        #Add the job dict to the list
        job_dict_list.append(job_dict)
    #clear the global list
    data_list.clear()
    return job_dict_list



#The file can be run by itself to load all the names and make a larger json
jfile = open("DALI_DATA.json")
member_list = json.loads(jfile.read())

#Get their names and jobs from the saved files
for member in member_list:
    name = member["name"]
    member["jobs"] = get_job_list(name)

#Open and save the new job json
with open('job_data.json', 'w') as outfile:
    json.dump(member_list, outfile)
