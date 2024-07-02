# API-Assignment: Hiking Trails API

### Introduction
Welcome!! The Hiking Trails API allos you to manage hiking trail information, add new trail routes, delete them, modify them, etc. 

### Installation and Configuration
* Clone this repository: (https://github.com/LuZo-stretch/API-Assignment-test.git).
* Run npm install to install all dependencies.
* Create .env file in your project root folder and add your variables. 

### Database Setup
* Create database: Use the SQL commands in the hiking_trails.sql file to create the database and table.

### Usage
* Run npm start to start the server on (http://localhost:3000).

### API Endpoints
| HTTP Verbs | Endpoints | Action
| --- | --- | --- |
| POST | /create-trail | To create a new trail route in the database |
| POST | /trails/:id/upvote | Increases the upvotes count for a specific trail |
| GET | /trails | To retrieve all the existing trails from the databasae |
| PUT | /trails/:id | To update an existing trail in the database |
| DELETE | /trails/:id | To delete an existing trail from the database |

### Dependencies
* Express: Web server frameworks for Node.js
* mysql2: MySQL client for Node.js
* Joi: Schema validation for JSON data.

### Using postman to test endpoints and responses you should receive:
1. POST/create-trail
![Create trail](assets\post_create.png)
2. POST/trails/:id/upvote
![Upvote trail](assets\post_upvote.png)
3. GET/trails
![Get trails](assets\get.png)
4. PUT/trails/:id
![Update trail](assets\put.png)
5. DELETE/trails/:id
![Delete trail](assets\delete.png)
