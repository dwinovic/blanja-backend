<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/dwinovic/blanja-backend">
    <img src="https://res.cloudinary.com/dnv-images/image/upload/v1631599120/Blanja%20com/blanja_pdgveq.svg" alt="Logo" width="140" height="194">
  </a>

  <h3 align="center">Backend Application for Blanja</h3>

  <p align="center">
    Back-end application or server in charge of supplying <br/> Blanja web application data needs through Rest API technology.
    <br />
    <a href="https://github.com/dwinovic/blanja-backend"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://blanja.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/dwinovic/blanja-backend">Report Bug</a>
    ·
    <a href="https://github.com/dwinovic/blanja-backend">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
        <ol>
            <li>
                <a href="#build-with">Build With</a>
            </li>
        </ol>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ol>
        <li>
          <a href="#installation">Installation</a>
        </li>
        <li>
          <a href="#prerequisites">Prerequisites</a>
        </li>
        <li>
          <a href="#related-project">Related Project</a>
        </li>
      </ol>
    </li>
    <li><a href="#blanja-api-documentation">Blanja API Documentation</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

<b>Blanja</b> is an online shop that currently focuses on the fashion market. Allows sellers to market their fashion products and customers can buy the best and cheap fashion needs.

### Build With
* [Express Js](https://expressjs.com/)
* [Node Js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)
* [Json Web Token](https://jwt.io/)
* [Nodemailer](https://nodemailer.com/about/)

## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* [Node Js](https://nodejs.org/en/download/)
* [MySQL](https://www.mysql.com/downloads/)
* [Postman](https://www.postman.com/downloads/)

### Installation
    
1. Clone These 2 Repos (Backend and Frontend)
```sh
https://github.com/dwinovic/Blanja-ReactJS
```
2. Go To Folder Repo
```sh
cd blanja-backend
```
3. Install Module
```sh
npm install
```
4. Make a new database and import [blanja-sample.sql](https://drive.google.com/file/d/1N7WlJEPonnIwcRwnVA3yN0EmCXes4dWJ/view?usp=sharing)
5. Add .env file at root folder project, and add following
```sh
DB_NAME=[DB_NAME]
DB_HOST = [DB_HOST]
DB_USER = [DB_USER]
DB_PASS = [DB_PASS]
PORT =4000
PRIVATE_KEY=[YOUR_PRIVATE_KEY_FOR_JWT_DECODE]
EMAIL_SERVICE=[YOUR_SMTP_EMAIL]
PASS_EMAIL_SERVICE=[EMAIL_PASS]
HOST_SERVER=[URL_LOCAL_BACKEND]
HOST_CLIENT=[URL_LOCAL_FRONTEND]
CLOUD_NAME=[YOUR_NAME_CLOUDINARY]
API_KEY=[YOUR_API_KEY_CLOUDINARY]
API_SECRET=[YOUR_API_SECRET_CLODINARY]
```
6. Starting application
```sh
npm run dev
```
7. Testing with Postman
    * [Blanja Postman APIs Collection](https://documenter.getpostman.com/view/15390348/Tzm8EEmp)

### Related Project

* [`Frontend-Blanja`](https://github.com/dwinovic/Blanja-ReactJS)
* [`Backend-Blanja`](https://github.com/dwinovic/blanja-backend)

## Blanja API Documentation

* [Blanja Postman APIs Collection](https://documenter.getpostman.com/view/15390348/Tzm8EEmp)

## Contact
My Email : novidwicahya19@gmail.com

Project Link: [https://github.com/dwinovic/blanja-backend](https://github.com/dwinovic/blanja-backend)
