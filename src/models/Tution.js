export default class Tuition {
  constructor(classID,teacherID, title, subject, classType, location, fee,date,time,studentList) {
    this.classID = classID;
    this.teacherID = teacherID;
    this.title = title;
    this.subject = subject;
    this.classType = classType;// physical or online
    this.location = location;
    this.fee = fee;// class fee
    this.date = date;// created date
    this.time=this.time;
    this.studentList=studentList;// students who enrolled to the class
  }
}
