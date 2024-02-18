# Project Setup Instructions

## Prerequisites

Before running the project, you need to have an account with MongoDB Atlas and set up a cluster to store your task data.

- If you do not have an account, you can create one for free [here](https://account.mongodb.com/account/register).


## Installation and Local Development

1. Clone the repo
```bash
   git clone git@github.com:jonnyroc/task-manager.git
   ```
2. cd into server and install dependencies
```bash
   cd task-manager/server
   yarn install
   ```
3. repeat the same for client folder
```bash
   cd task-manager/client
   yarn install
   ```
5. use the .env.sample file and rename it to .env, and replace the connection string in it with your mongodb credentials
5. In the server folder run `yarn dev` to start local server at `http://localhost:4000/graphql`
6. From within the client folder run `yarn start` to start task manager in your default browser