# Assets Managemnet App - Backend

Asset Rack is a user-friendly tool for keeping track of physical assets. It helps organizations manage assets efficiently with features like tracking, maintenance schedules, and facilitate convenient asset distribution among teams.

# Features included are:

- Users must sign up and provide all the required information about their company; otherwise, they can't proceed.
- Users can add assets, track their assets, and more.
- Users can create multiple sub-users through their account and check out the particular asset to a desired user.
- Particular users can check in the asset if they use it.
- Users can also manage their assets, lease, and dispose of them.

## Getting Started

These instructions will get project running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Xampp](https://www.apachefriends.org/)
- [Sequelize](https://sequelize.org/)

## Sequelize Setup

To set up Sequelize, a popular ORM for Node.js, you'll need to ensure that you have the following prerequisites in place. This guide will walk you through the necessary steps to prepare your environment for Sequelize.

### Prerequisites

- **Node.js** and npm/yarn: Ensure you have Node.js and npm or yarn installed on your system.
- **npm**: It comes with Node.js, but you can update it using the command npm install -g npm.
- **Database Server**: Install and set up a database server. Sequelize supports multiple databases:

      - **PostgreSQL**: `npm install pg pg-hstore`
      - **MySQL**: `npm install mysql2`
      - **MariaDB**: `npm install mysql2`
      - **SQLite**: `npm install sqlite3`
      - **Microsoft SQL Server**: `npm install tedious`

- **Sequelize CLI (optional but recommended)**: This provides helpful tools for managing your Sequelize setup.

      - Install globally: `npm install -g sequelize-cli`
      - Install locally (for project-specific usage): `npm install --save-dev sequelize-cli`

### Package.json

- We are using the MySQL database and the Sequelize npm package. NOTE: Please don't delete the mysql2 package as it is a driver for Sequelize.

### Installation

1. Install dependencies with npm:
   `npm install`

## Configure app

Add `.env` file at root of the project. Sample values available in `.env.example` file.

### Port

This backend would run on port `8080`, if you provide PORT `8080` in `.env` file.

The required PORT can be added in the `.env` file.

### Running the Project on Locally

Start running a project with the following command:

`npm run dev` or `nodemon` 

## Error Handling

- The error messages returned by the API are informative. 
- Handled unexpected errors using try-catch statements where needed.
- Returned the error messages where required.
- Tested error scenarios and unexpected errors.

## Additional Information

- The *src/index.js* is the starting point of this app.
- Only the required dependencies and devDepndencies are installed in the app.
