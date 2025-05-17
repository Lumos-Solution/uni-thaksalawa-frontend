export default class UserTuition {
  constructor(userID, classID, status = 'pending') {
    this.userID = userID;
    this.classID = classID;
    this.status = status;  // e.g., 'pending', 'confirmed'
  }
}
