## Database Testing Server V1.0

### Database Testing Server

A simple server used to test different database.

<br>

Different branch will associate with different database.

---

### To run the application

[Project Repo](https://github.com/markchen555/Database-Testing-Server)

Fork a copy from github or download the repository on your computer, unzip it and launch the terminal at the root directory of the folder.

1. Run `npm install` to install all dependency to your local machine.
2. Run `npm start` to start your server.
3. Open another tab at your terminal.
4. Run `npm run mongod` to start mongoDB.

---

### MongoDB instruction

1. Download MongoDB and move it into `applications` and rename to `mongodb`.
2. Run `sudo mkdir /data/db` to create directory for mongodb.
3. Run `sudo mongod` to run initiate the database.
* Run `sudo chown -R $USER /data/db` if you want to avoid enter `sudo` all the time.  

---

### Reference

- [Express]()
- [Node]()
- [MongoDB]()
- [Mongoose]()
- [Compression]()
- [Robomongo](https://robomongo.org/)
- [Joi]()
- [bcrypt-nodejs]()

---

### License

The project is licensed under the [MIT license](license.txt).
