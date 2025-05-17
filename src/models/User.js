
export default class User {
  constructor(userID, name, pwd, contact, email, userType, location) {
    this.userID = userID;
    this.name = name;
    this.pwd = pwd;//password
    this.contact = contact;
    this.email = email;// USE AS THE userName
    this.userType = userType;    //UNDERGRADUATE,AFTER a/L, GRADUATE LIKE THIS
    this.location = location;
  }
}
