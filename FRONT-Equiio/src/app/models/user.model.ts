export class User {
  constructor(lastname: any, firstname: any, mail: any, phone: any) {
    this.lastname = lastname;
    this.firstname = firstname;
    this.mail = mail;
    this.phone = phone;
  }

  public id: string;
  public lastname: string;
  public firstname: string;
  public mail: string;
  public phone: string;
  public role: string;
}
