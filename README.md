# Propylon Document Manager Assessment
To run this project you need to open 2 different terminal. One to run the react app and one to run the node js APIs.
### Client Development 
The client project is a [Create React App](https://create-react-app.dev/) that has been tested against [Node v18.19.0 Hydrogen LTS](https://nodejs.org/download/release/v18.19.0/).  An [.nvmrc](https://github.com/nvm-sh/nvm#calling-nvm-use-automatically-in-a-directory-with-a-nvmrc-file) file has been included so that the command `$ nvm use` should select the correct NodeJS version through NVM.
1. Navigate to the client/doc-manager directory.
2. create a .env.local file with content - REACT_APP_BASEURL=http://localhost:5555
REACT_APP_CLINETURL=http://localhost:3000
3. `$ npm install` to install the dependencies.
4. `$ npm start` to start the React development server.

### NodeJS API Development 
The API project is a NodeJS project.
1. Navigate to the node/doc-manager-api directory.
2. create a .env file with content - PORT=5555
3. create uploads folder in the root of the directory. It should be seen after src folder in the project structure.
4. `$ npm install` to install the dependencies.
5. `$ npm start` to start the Node server.
6. It should start the node server on port 5556 port

**Note**: Once the project is up and running, you will see a login page. User credentials can be found in node js project under src/constants/user.json file. When you upload any file from front end, you can see the json is updated with the file name and version under particular user who is uploading the file. Also the file is added in the uploads folder in node. To  view the file just type the filename and version. For example - if you have uploaded the file "abcd.pdf", just type abcd and 0 in the get file page. You will see the file will be fetched and you can view it clicking on eye icon. 

Please feel free to reach out to me incase of any issues - mukherjee.ishika1707@gmail.com
