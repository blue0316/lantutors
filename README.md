![](https://github.com/israelias/lantutors/blob/master/public/notifications.png?raw=true)
# Lantutors
Scholastic administrative app for educators, home-based tutors, and mentors to connect with students that can benefit from after-school or full-time tutoring.
The app's overwhelming long-term purpose and value is for registered tutors to perform administrative functions for on-campus or remote-based classes effectively and consistently.

Please visit the project at [lantutuors.vercel.app](https://lantutors.vercel.app).


Additionally, the restful backend API can be viwed at [appspot.com/api](https://fsdisraelias.df.r.appspot.com/). For a sample response, please visit the [commonstudents](https://fsdisraelias.df.r.appspot.com/api/commonstudents) endpoint.

[Go to backend](https://github.com/israelias/lantutors/tree/master/backend)      

[Go to frontend](https://github.com/israelias/lantutors/tree/master/frontend)
## UX
### User Stories
#### New Tutor Goals
- As a New Tutor, I want to have a good understanding of what the website does.
- As a New Tutor, I want to be able to create an account as a registered tutor.
- As a New Tutor, I want to be able to see a table of existing turor(s) and student(s) assigned to them.
- As a New Tutor, I want to be able to see a table/list of all currently registered students.
- As a New Tutor, I want to be able to see a table/list of all currently registered students assigned to all existing tutors. 
#### Returning Tutor Goals
- As a Returning Tutor, I want to be able to log in securely.
- As a Returning Tutor, I want to be able to create a student account for a student.
- As a Returning Tutor, I want to be able to add a flag to a student's account with a `suspension` record.
- As a Returning Tutor, I want to be able to edit a student account I created.
- As a Returning Tutor, I want to be able to assign a student to one or more existing tutors.
- As a Returning Tutor, I want to be able to see a list of student(s) filtered by a specific tutor they are assigned to. 
- As a Returning Tutor, I want to be able to edit the list of student(s) assigned to specific tutor(s). 
#### Frequent Tutor Goals
- As a Frequent Tutor, I want to retrieve a list of students who are not `suspended` and can thus receive and be alerted by a notification I create.
- As a Frequent Tutor, I want to be able create a notification message that, by default, alerts students that are assigned to me as a tutor.
- As a Frequent Tutor, I want to be able create a notification message that alerts my students as well as students I explicitly mention in my notification whether or not they are assigned to me as a tutor.

## Features
### Existing Features

*** TODO ***
#### All Students
![](https://github.com/israelias/lantutors/blob/master/public/students.png?raw=true)

#### Common Students
![](https://github.com/israelias/lantutors/blob/master/public/sortcommon.png?raw=true)

#### Notifications
![](https://github.com/israelias/lantutors/blob/master/public/notifications.png?raw=true)

#### Post / Register
![](https://github.com/israelias/lantutors/blob/master/public/notify.png?raw=true)
#### Suspend
![](https://github.com/israelias/lantutors/blob/master/public/student.png?raw=true)

### Features Left To Implement
- Ability to delete an account
- Ability to search existing tutors and students 
- Ability to issue a request to another tutor when his/her student is being reassigned to another tutor

## Technologies
### Frameworks and Libraries
  - ### [`cd frontend`](https://github.com/israelias/lantutors/tree/master/frontend)
    Please visit the [frontend](https://github.com/israelias/lantutors/tree/master/frontend) sub directory for details on ReactJS Typescript frameworks and libraries.\

[Go to frontend](https://github.com/israelias/lantutors/tree/master/frontend)
  - ### [`cd backend`](https://github.com/israelias/lantutors/tree/master/backend)
    Please visit the [backend](https://github.com/israelias/lantutors/tree/master/backend) root directory for details on ExpressJS Sequelize frameworks and libraries.


[Go to backend](https://github.com/israelias/lantutors/tree/master/backend)


### Programs and Software
- [VSCode:](https://www.vscode.com/) Visual Studiio Code 2020.3.2 by [Microsoft](https://www.microsoft.com/) is the IDE used to locally construct the project
- [Git:](https://git-scm.com/) Git is used as the version control system and is utilized via the WebStorm terminal to `commit` to Git and `push` to GitHub.
- [GitHub:](https://github.com/) GitHub is used to store the project's code and directory upon concurrent `push`es via Git.

# Testing
## User testing
### TBD

## Code testing
  - ### [`cd backend`](https://github.com/israelias/lantutors/tree/master/backend)
    Please visit the [backend](https://github.com/israelias/lantutors/tree/master/backend) root directory for details on running unit tests with `Joi/Express` validation and a pre-configured database `Factory`.
## Deployment

- The project frontend is written in [Typescript]() developed with [React](https://reactjs.org/), bootstrapped with [NextJS](https://nextjs.org/) by using `npx create-next-app --typescript` and deployed with [Vercel](https://nextjs.org/docs/deployment). The backend is written in [Javascript](), developed with [ExpressJS]() to serve a restful MySQL database via [Sequelize-CLI]() hosted with [GoogleCloud SQL]() and deployed with [Google Cloud App Engine](). 
  ### [`cd frontend`](https://github.com/israelias/lantutors/tree/master/frontend)
  Please visit the [frontend](https://github.com/israelias/lantutors/tree/master/frontend) root directory for details on deployment steps.
  ### [`cd backend`](https://github.com/israelias/lantutors/tree/master/backend)
  Please visit the [backend](https://github.com/israelias/lantutors/tree/master/backend) root directory for details on deployment steps.

## Cloning This Repo
- Clone this repo by running `git clone https://github.com/israelias/lantutors`
- at the jump, `cd` to the name of this repo:
`cd lantutors`
  ### [`cd frontend`](https://github.com/israelias/lantutors/tree/master/frontend)
  Please visit the [frontend](https://github.com/israelias/lantutors/tree/master/frontend) root directory for details on required modules via `yarn install` and to start the frontend development server on `localhost:3000`.
  ### [`cd backend`](https://github.com/israelias/lantutors/tree/master/backend)
  Please visit the [backend](https://github.com/israelias/lantutors/tree/master/backend) root directory for details on required modules via and ***ExpressJS-SequelizeCLI-specific*** `package.json` and to start the backend development server on `localhost:4000`.
- Alternatively, you can clone each of the subdirectories separately, and follow the procedures given from this `monorepo/subrepo`.

## Credits

### Code
- Some frontend components are assembled from references available in [Material-UI's Getting Started Templates](https://material-ui.com/getting-started/templates/). This was done to streamline `Layout` configurations so production could focus on data UI.
### Acknowledgments
#### ESLint and Typescript Configuration
- [ESlint Typescript with Prettier](https://dev.to/benweiser/how-to-set-up-eslint-typescript-prettier-with-create-react-app-3675) 
- [Create-React-App: Typescript, ESLint & Prettier with Airbnb style guides on VSCode](https://medium.com/react-courses/react-create-react-app-v3-4-1-a55f3e7a8d6d)
- [Airbnb Javascript style guide — Key takeaway](https://medium.com/docon/airbnb-javascript-style-guide-key-takeaways-ffd0370c053)
-[Config ESLint, Prettier in Typescript React App](https://rajduraisamy.medium.com/config-eslint-prettier-in-typescript-react-app-c92ebf14a896)
#### ReactJS and Typescript References
- [ReactJS Typescript components](https://medium.com/react-courses/instant-write-reactjs-typescript-components-complete-beginners-guide-with-a-cheatsheet-e32a76022a44)

#### Sequelize-CLI ExpressJS backend 
- [ExpressJS: Accessing `req.query` vs `req.body`](http://expressjs.com/en/4x/api.html#req.body)
- [Joi: Validating an Input That Can Be More Than One Datatype](https://stackoverflow.com/questions/53155132/check-if-an-input-variable-is-string-or-array-using-joi)
- [ExpressJS unit testing with routes](https://stackoverflow.com/questions/9517880/how-does-one-unit-test-routes-with-express)
- [Node and Express Testing](https://mherman.org/blog/testing-node-and-express/)
- [Node, Express, MySQL, Sequelize exmaple](https://medium.com/@prajramesh93/getting-started-with-node-express-and-mysql-using-sequelize-ed1225afc3e0)
- [Creating Sequelize MYSQL Model Associations with Sequelize-CLI](https://levelup.gitconnected.com/creating-sequelize-associations-with-the-sequelize-cli-tool-d83caa902233)
- [Sequelize Association with `WHERE IN ("ARRAY)`](https://stackoverflow.com/questions/42719750/sequelize-relation-with-where-in-array)
- [Setting Up Sequelize Associations](https://medium.com/craft-academy/setting-up-sequelize-associations-abddc5ed16d0)
- [CRUD Testing with NodeJS and Express](https://mherman.org/blog/testing-node-and-express/)


#### Factory-Girl with Sequelize-CLI References
- [Sequelize Adapter Set Up](https://stackoverflow.com/questions/47255125/factory-girl-set-up-with-sequelize-adapter)
- [FactoryGirl: How to `find_or_initialize` when Testing](https://stackoverflow.com/questions/22874292/find-or-initialize-by-in-factorygirl)
- [FactoryGirl With Sequelize Adapter: Breaking Configs](https://github.com/simonexmachina/factory-girl/issues/63)

#### Google Cloud Platform, CloudSQL connection to ExpressJS and Sequelize
- [Full-Stack App on GCP with a Cloud SQL Connection](https://dev.to/wpreble1/deploy-a-full-stack-app-on-gcp-with-a-cloud-sql-connection-part-2-14il)
- [Deploying Flask Restful Backend](https://medium.com/analytics-vidhya/flask-restful-api-with-heroku-da1ecf3e04b)

#### Relevant Latest NextJS to Material-UI-V5 Breaking Changes
- [June 2020: MUI Migration from v4 to v5](https://github.com/mui-org/material-ui/blob/HEAD/docs/src/pages/guides/migration-v4/migration-v4.md)
