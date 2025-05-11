# A Chatting app with NodeJS & Express

**This is an app that I build for practicing Node and express**
**NO AI were used for this project**

A simple chatting app, though there is no websocket used, or polling implemented. (tested only in local)
some css styling missing in login/signup

### Tech used:
- NodeJS
- Express
- MongoDB
- Mongoose
- bcrypt (pw decryption/hashing)
- passport (user auth)

### How to use

To clone and run this application, you'll need Nodejs installed on your computer.

```
# Clone this repository
git clone https://github.com/CarrotRP/node-chat.git

# Go into the repository
cd node-chat

# Install dependencies
npm install

# Create your mongodb project and database
# Get your database access user info(username and pw)
# Get your dbURI("Connect" button > Drivers > Copy the url)
# url example: mongodb+srv://<USERNAME>:<DB_PASSWORD>@ur-appname.nx6rqxd.mongodb.net/<DATABASE_NAME>?retryWrites=true&w=majority&appName=ur-appname

# NOTE: if you leave the <DATABASE_NAME> empty, it will automatically create a database name itself called 'test'

# Add a .env file, inside the file type your PORT, name, password and session_secret
# .env file example:
#PORT = 3000;
#name = "ur_username"
#password = "ur_pw"
#session_secret = "any_word"

# Then run
node app

# And go to localhost
```

Note: If you don't want to reload the server everytime after edit, use [nodemon](https://www.npmjs.com/package/nodemon)
