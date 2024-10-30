export class User {
    id:        number = 0;
    firstName: string = ""; 
    lastName:  string = ""; 
    dateBorn?:  Date;
    username:  string = ""; 
    email:     string = ""; 
    password:  string = ""; 
    createdAt: Date = new Date();
    admin:     boolean = false;
}
