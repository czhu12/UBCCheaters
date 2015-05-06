from bs4 import BeautifulSoup
import urllib2
from time import sleep
import psycopg2

course_counter = 0

def main():
  conn = psycopg2.connect("dbname='chatty_dev' user='chatty_dev' host='localhost' password='chatty_dev'")
  cur = conn.cursor()
  #username: "chatty_dev",
  #password: "chatty_dev",
  #database: "chatty_dev"
  print "I connected bitch"
  import_courses(cur)

def import_courses(cur):
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
      
      namedict = generate_namedict(dept, courses)
      cur.executemany("""INSERT INTO courses (dept, course, title) VALUES (%(dept)s, %(course)s, %(title)s)""", namedict)

      sleep(1)

def generate_namedict(dept, courses):
  namedict = []
  dept_key = dept['key']
  for course in courses:
    course_number = course['key']
    title = course['title']

    namedict.append({
      "dept": dept_key, "course": course_number, "title": title
    })

  return namedict

if __name__ == "__main__":
  main()
