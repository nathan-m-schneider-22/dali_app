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
    sections = f.read().split("pv-profile-section__card-heading")

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

    keywords = ["duration","dates","location"]

    current_list_job.append(data_list[index-1])
    while index < len(data_list)-1:

        if any(k in data_list[index].lower() for k in keywords) and \
            len(data_list[index]) < 20:
            current_list_job.append(data_list[index])
            current_list_job.append(data_list[index+1])
            index +=2

        elif data_list[index+1] == "Company Name":
            all_list_jobs.append(current_list_job)
            current_list_job = []
            current_list_job.append(data_list[index])
            current_list_job.append(data_list[index+1])
            index +=2
        else:
            current_list_job.append(data_list[index])
            index += 1
                    
    #List of dicts we will be returning
    job_dict_list = []
    job_id = 0
    for current_list_job in all_list_jobs:
        #initalize the dictionary, establish the categories
        #We track company name, duration, location, dates, and extra
        #A category with descriptors and titles
        job_dict = {}
        job_dict["extra"] = ""
        job_dict["location"]  = ""
        i = 0 
        #Check the current string for relevancy (comes in multiple orders)
        while i < len(current_list_job):
            if "company name" in current_list_job[i].lower():
                job_dict["company_name"] = current_list_job[i+1]
                i+=1
            elif "duration" in current_list_job[i].lower() \
                and len(current_list_job[i].lower()) < 20:
                job_dict["duration"] = current_list_job[i+1]
                i+=1
            elif "location" in current_list_job[i].lower() \
                and len(current_list_job[i].lower()) < 20:
                job_dict["location"] = current_list_job[i+1]
                i+=1
            elif "dates" in current_list_job[i].lower():
                job_dict["dates"] = current_list_job[i+1]
                i+=1
            elif "title" in current_list_job[i].lower() \
                and len(current_list_job[i].lower()) < 60:
                job_dict["title"] = current_list_job[i+1]
                i+=1

            else:
                #Add the descriptions as extra, except for junk/caught up HTML and links
                if not any(avoid in current_list_job[i] for avoid in ["See more","...",">","<","//"]):
                    job_dict["extra"] +=  current_list_job[i].replace("•","") + "\n"
            i+=1
        if "title" not in job_dict: job_dict["title"] = current_list_job[0]
        #Add the job dict to the list
        job_dict["job_id"] = job_id
        job_id+=1
        job_dict_list.append(job_dict)
    #clear the global list
    data_list.clear()
    return job_dict_list



#The file can be run by itself to load all the names and make a larger json
jfile = open("DALI_DATA.json")
member_list = json.loads(jfile.read())

member_id = 0
#Get their names and jobs from the saved files
for member in member_list:
    name = member["name"]
    member["id"] = member_id
    member_id+=1
    member["jobs"] = get_job_list(name)


# Open and save the new job json
with open('job_data.json', 'w') as outfile:
    json.dump(member_list, outfile)
