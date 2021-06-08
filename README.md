# student-management-backend

Postman:
https://www.getpostman.com/collections/fdd4d23afa552d169904

Required softwares:

1. NodeJS
2. MySQL

## 🚀 How to run locally

1. **Clone the repo and go inside the folder.**

2. **Install the project dependencies**

   ```shell
    npm install
   ```

3. **Create `.env` file in the root folder, with the ff. format.**
   Fill in the appropriate mysql credentials.

   ```shell
    APP_PORT=4000
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=password
    DB_NAME=development-student-management
    DB_DIALECT=mysql
    DB_PORT=3306
    APP_HOST=localhost
    NODE_ENV=development
   ```

4. **Create development database.**
   ```shell
     npm run db:create
   ```
5. **Run the migrations.**
   ```shell
     npm run db:migrate
   ```
6. **Run the app**
   ```shell
     npm run dev
   ```

## 🚀 How to run test

1. **Create `.env.test` file in the root folder, with the ff. format.**
   Fill in the appropriate mysql credentials for test evironment.
   ```shell
     APP_PORT=4000
     DB_HOST=localhost
     DB_USER=root
     DB_PASS=password
     DB_NAME=test-student-management
     DB_DIALECT=mysql
     DB_PORT=3306
     APP_HOST=localhost
     NODE_ENV=test
   ```
2. **Run the test**

   ```shell
     npm run test
   ```

   The test results should look like this.

   ```shell
      PASS  src/controllers/api.controller.spec.js (12.529 s)
      Api Controller
        Register API
          Invalid body
            ✓ should fail without tutor  (23 ms)
            ✓ should fail without students  (22 ms)
            ✓ should fail if tutor is not an email (8 ms)
            ✓ should fail if students are not in email format (3 ms)
          Valid body
            ✓ should pass for new tutor and students (132 ms)
            ✓ should pass for existing tutor and new students (20 ms)
            ✓ should pass for new tutor and old students (1024 ms)
        GetCommonStudents API
          Invalid query
            ✓ should fail without tutor  (3 ms)
            ✓ should fail if tutor is not an email  (4 ms)
          Valid query
            ✓ should pass for single common tutor  (1075 ms)
            ✓ should pass for multiple common tutor (1037 ms)
        SuspendStudent API
          Invalid body
            ✓ should fail for nonexistent student (4 ms)
          Valid body
            ✓ should pass for existing student (13 ms)
        ReceiveNotifications API
          Invalid body
            ✓ should fail if tutor is empty (2 ms)
            ✓ should fail if notification is empty (3 ms)
        Valid body
          ✓ should fail if tutor doesnt exist (5 ms)
          ✓ should pass and retrieve students that belongs to the tutor (1033 ms)
          ✓ should pass and retrieve students that belongs to the tutor and mentioned students (2045 ms)
          ✓ should pass and retrieve students that are not suspended only (2035 ms)
   ```
