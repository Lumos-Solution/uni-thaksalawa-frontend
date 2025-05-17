
export default class User {
  constructor(userID,userName, name, pwd, contact, email, userType, location) {
    this.userID = userID;
    this.userName=userName;
    this.name = name;
    this.pwd = pwd;//password
    this.contact = contact;
    this.email = email;
    this.userType = userType;    //UNDERGRADUATE,AFTER a/L, GRADUATE LIKE THIS
    this.location = location;
  }
}
