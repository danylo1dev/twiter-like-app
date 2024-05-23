# Twiter like app

This application is built using Firebase, specifically the Authentication database. It also utilizes Firebase hosting for React and cloud functions for NestJs. The application enables users to register, create test posts, comment, and like posts.

## What I have learn

- Building a web application using Firebase: The text describes an application built using Firebase, a comprehensive platform for developing and deploying mobile and web applications. Firebase offers various services, including authentication, databases, hosting, cloud functions, and more.

- Firebase Authentication: The application specifically utilizes Firebase Authentication, a service that enables user registration, login, and session management. This allows users to securely access the application and perform actions associated with their accounts.

- Firebase Hosting: The application employs Firebase Hosting, a service that provides a platform for hosting web applications. Firebase Hosting simplifies the deployment and management of web applications, ensuring they are accessible to users worldwide.

---

# Installing

## Prerequisites

Before you begin, ensure you have Node.js version 18.16.0 or later installed on your machine.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/danylo1dev/twiter-like-app.git
   ```

2. Install all dependencies in folders `back` and `front`:

   ```bash
   cd front
   npm ci
   cd ../
   cd back
   npm ci
   ```

3. Build apps
   ```bash
    cd front
    npm run build
    cd ../
    cd back
    npm run build
   ```
4. Deploy app

   ```bash
    firebase deploy
   ```

5. Run local

   ```bash
    firebase serve
   ```
