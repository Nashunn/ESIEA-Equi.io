# ESIEA-Equiweb
> A website for a horse riding club 🎠

## Introduction
This application was made as part of our school work at ESIEA.
We had to work in pairs, and our team is composed of ![Nicolas BOULLET](https://github.com/Nashunn) and ![Yohan LE BRICQUER](https://github.com/yohanleb).

The purpose was to create a website with Angular and see what the creation of a website implies. 
We chose to make this application in Angular with a Node.js backend. 

## Instructions
- User : 
  - can register to become a horse rider
- Horse rider : 
  - edit his personal information (name, surname, e-mail address, telephone number) so that he can be contacted if necessary
  - register in available resumptions by filtering them by level
  - consult the resumptions where I am registered to know which horse I am going to ride
- Instructors : 
  - create a resumption schedule by choosing the times and levels of the riders (levels = from 1 to 7, or Gallop)
  - connect to the site to create resumptions ( lessons ) to associate horses to my riders
- Administrator :
  - search for a horse rider and see his personal information to be able to contact him
  - create accounts for the instructors with their personal information (last name, first name, e-mail address, telephone number) so they can log on to the site
  - manage the list of the club's horses (name) so that the instructors can associate them with the riders

## Demonstration
### General
- Homepage

![User homepage](./_screenshots/accueil_no%20connection.png)

- Registration

![Registration](./_screenshots/inscription.png)

- Connexion

![Connexion](./_screenshots/connexion.png)

- Forget Password

![Forget Password](./_screenshots/forgetPassword.png)

- User Account

![User Account](./_screenshots/user_account.png)

![User Account Modify](./_screenshots/user_account_modify.png)

### User
- Lessons

![User lessons](./_screenshots/user_lessons.png)

- Subscribe to lessons

![User subscribe lessons](./_screenshots/user_subscribe.png)

![User subscribe lessons](./_screenshots/user_subscribe_alert.png)

### Teacher
- Lessons

![Teacher lessons](./_screenshots/teacher_lessons.png)

- Create lessons

![Teacher create lesson](./_screenshots/teacher_lessons_create.png)

- Lesson details

![Teacher lesson details](./_screenshots/teacher_lesson_details.png)

![Teacher lesson details Modify](./_screenshots/teacher_lesson_details_modify.png)

### Admin
- User manager

![Admin user manager](./_screenshots/admin_userManager.png)

- Create user

![Admin create user](./_screenshots/admin_createUser.png)

- Horses manager

![Admin horse manager](./_screenshots/horses.png)

- Create horse

![Admin create horse](./_screenshots/horses_create.png)

- Modify horse

![Admin create horse](./_screenshots/horses_modify.png)

- Delete horse

![Admin create horse](./_screenshots/horses_delete.png)

![Admin create horse](./_screenshots/horses_delete_alert.png)

## Tools
- [Angular](https://angular.io/)
- [Node.js](https://nodejs.org/)
- [Angular Material](https://material.angular.io/) 
- [MongoDB](https://cloud.mongodb.com/)

## Installation
```
# clone project
git clone https://github.com/Nashunn/ESIEA-Equi.io.git

# install Back dependencies and start it 
cd BACK-Equiio\
npm install
nodemon server.js

# install Front dependencies and start it
cd FRONT-Equiio\
npm install
npm start
