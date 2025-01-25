# API Server with Node.js, Express, Podman, and MongoDB

This project is an API server built using Node.js and Express, with functionality tested using Podman for containerization and MongoDB as the database.

## Features

- RESTful API endpoints for data management.
- MongoDB integration for persistent storage.
- Podman-based containerization for seamless deployment and testing.
- Easy setup and configuration for local development.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Podman](https://podman.io/)
- [Podman-compose]()
- [MongoDB](https://www.mongodb.com/)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### Configure Environment Variables
Create a .env file in the root of the project and add the following:

```env
MONGO_URI=mongodb://localhost:27017/your-database-name
PORT=3000
```
### Start MongoDB with Podman
```bash
podman-compose build --no-cahce
podman-compose up
podman-compose down
```

The server will start at http://localhost:3000.

### API Endpoints
Method	Endpoint	Description
```http
GET	  http://localhost:27017/api/request/users	#Get all items
POST	http://localhost:27017/api/request/users	#Add a new item
```
