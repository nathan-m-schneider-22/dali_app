import json
jfile = open("DALI_DATA.json")
obs = json.loads(jfile.read())

class DALI_member:
    def __init__(self,name,year,role,major,birthday):
        self.name = name
        self.year = year
        self.quote = ""
        self.role = role
        self.major = major
        self.birthday = birthday

    def __str__(self):
        return ("%s '%d  %s %s" %(self.name,self.year,self.role,self.major))

members = []
for m in obs:
    name = m["name"]
    year = int(m["year"][1:])
    quote = m["quote"]
    role = m["role"].split(", ")
    major = m["major"].split(", ")
    birthday = m["birthday"]
    members.append(DALI_member(name,year,role,major,birthday))

for m in members: 
    try: 
        open("./member_jobs/"+m.name.replace(" ","_")+".html","r")
    except  FileNotFoundError:
        print(m)