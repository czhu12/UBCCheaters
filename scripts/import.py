from bs4 import BeautifulSoup
import urllib2
import urllib
import time
import psycopg2

course_counter = 0

def main():
  import_courses()

def import_courses():
  all_courses_path = "https://courses.students.ubc.ca/cs/servlets/SRVCourseSchedule?sessyr=2015&sesscd=W&req=0&output=3"
  response = urllib2.urlopen(all_courses_path)
  all_courses_xml = response.read()
  all_courses = BeautifulSoup(all_courses_xml)
  depts = all_courses.find_all('dept')
  for dept in depts:
    # Make a request to get the details for this course
    key = dept['key']
    if key.strip() != '':
      course_path = "https://courses.students.ubc.ca/cs/servlets/SRVCourseSchedule?sessyr=2015&sesscd=W&req=2&dept={0}&output=3".format(key)
      res = urllib2.urlopen(course_path)
      course_xml = res.read()
      course = BeautifulSoup(course_xml)
      courses = course.find_all('course')
      
      for course in courses:
        try: 
            body = generate_req_body(dept, course)
            encoded_body = urllib.urlencode(body)
            urllib2.urlopen('http://localhost:5555/api/courses', encoded_body)
        except:
            print encoded_body, " failed"

      time.sleep(0.5)

def generate_req_body(dept, course):
    return { "dept": dept["key"], "course": course["key"], "title": course["title"], "faccode": dept["faccode"]}

def generate_namedict(dept, courses):
  namedict = []
  dept_key = dept['key']
  faccode = dept['faccode']
  for course in courses:
    course_number = str(course['key'])
    title = course['title']

    namedict.append({ "course": {
      "dept": dept_key, 
      "course": course_number, 
      "title": title,
      "faccode": faccode
    }})

  return namedict

if __name__ == "__main__":
  main()
