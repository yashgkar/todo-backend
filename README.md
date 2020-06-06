# TaDa✨ - The ToDo App
This repository contains backend made using node for [Hackerearth StackHack 1.0 challenge.](https://www.hackerearth.com/challenges/hackathon/stackhack-v1/ "Hackerearth StackHack 1.0 challenge."). It uses mongoose API to connect to MongoDB which is used as database.

## Live Demo
[TaDa✨ - The ToDo App](https://todo-frontend-1e0b5.firebaseapp.com/login "TaDa✨ - The ToDo App")

## Versions:
- **node:** v10.x
- **npm:** 6.9.0

## Frontend
The frontend written in angular can be found [here](https://github.com/cyproto/todo-frontend.git "here").

## Installation and running the app
```bash
git clone https://github.com/yashgkar/todo-backend.git
cd todo-backend
npm install
node app.js
```

## APIs
There are in total of 11 APIs. They are as follows:
- **register (POST):** To register new user.
- **login (POST):** To login and start user session.
- **tasks (GET):** To get all tasks associated to the current user.
- **task (POST):** Add a new task the current user's bucket.
- **task (PUT):** Update a specific task wih id.
- **task (DELETE):** Delete any task with id.
- **completed-task (PUT):** Mark task as completed.
- **labels (GET):** Get all labels present in collection.
- **statuses (GET):** Get all status types.
- **logout (GET):** Logout and clear session for current user.
- **getUserName (GET):** Get current user's name.

The request and response json formats for these APIs can be found [here](https://gist.githubusercontent.com/cyproto/4e93507e3dfd04b36bda6d27ef53b27e/raw/d4a8ad351586f496c12e65721a05aad5026ee6c8/todo-app-request-response.txt "here").

## Screenshots

|  <img src="https://i.imgur.com/zFW98Zl.png"> | <img src="https://i.imgur.com/Edxt21K.png">  |
| ------------ | ------------ |
|  <img src="https://i.imgur.com/LMf4sxz.png"> | <img src="https://i.imgur.com/vQJCk5w.png">  |

## Screen record

[Vimeo.](https://vimeo.com/426473936 "Vimeo link.")