---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: Get Started
permalink: /
---

Live demo available at [https://nilsriga.ddns.net](https://nilsriga.ddns.net)

This repository contains the completed test project for **Trodo**, implementing a currency rate conversion chart using an external API. The project includes a **NestJS** backend, a **NextJS** SSR frontend, and is designed to run with a CI/CD pipeline, **Nginx** reverse proxy, and **PM2** process management. It is fully documented at [https://nilsriga.github.io/currency/](https://nilsriga.github.io/currency/) and includes setup instructions, detailed API documentation, and testing protocols.

## Project Overview

- **Backend**: NestJS API with MySQL database and TypeORM, with Sentry for monitoring.
- **Frontend**: Next.js (SSR) PWA with Redux and 100% Lighthouse score.
- **CI/CD**: GitHub Actions configured for unit, integration, and e2e testing.
- **Production Setup**: Nginx reverse proxy, PM2 process management, self-hosted runner.
- **Documentation**: Full project documentation hosted via Jekyll in `/docs`.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Setup Instructions](#setup-instructions)
3. [Development Commands](#development-commands)
4. [Testing](#testing)
5. [Production Setup](#production-setup)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Documentation](#documentation)

## Project Structure

```
.
├── .github              # GitHub Actions for CI/CD
├── admin                # Admin tools, including database dump and ecosystem config for PM2
├── back                 # Backend API (NestJS)
├── docs                 # Jekyll documentation for full project overview
├── front                # Main frontend (Next.js, SSR, PWA)
└── front-vanilla        # Alternate frontend in vanilla React (is working)
```

## Setup Instructions

### 1. Repository and Dependencies
First, download the repository and install the dependencies for each section:

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Backend Setup (NestJS)

1. **Navigate to the backend directory**:
   ```bash
   cd back
   ```

2. **Install MySQL** (if not installed). Then create a new MySQL database.

3. **Configure Environment Variables**:
   - Duplicate `example.env` as `.env` in the `back` folder.
   - Fill out `.env` with your MySQL connection details.

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Run Database Migrations**:
   ```bash
   npm run typeorm migration:run
   ```

6. **Load Initial Data**:
   - Navigate to the `admin` folder and load the `currencies.sql` file to populate the database with initial values:
     ```bash
     mysql -u <username> -p <database_name> < admin/currencies.sql
     ```

7. **Start Development Server**:
   ```bash
   npm run start:dev
   ```

> **Note**: For testing environments, you may need to install MySQL and SQLite3 globally to avoid any errors:
> ```bash
> npm install -g mysql sqlite3
> ```

### 3. Frontend Setup (Next.js)

1. **Navigate to the frontend directory**:
   ```bash
   cd ../front
   ```

2. **Configure Environment Variables**:
   - Duplicate `example.env` as `.env` and customize as needed.

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

## Development Commands

### Backend Commands

- **Run Development Server**: `npm run start:dev`
- **Run Database Migrations**: `npm run typeorm migration:run`
- **Run Backend Tests**: `npm run test`

### Frontend Commands

- **Start Frontend Dev Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Start Production Server**: `npm start`

## Testing

This project uses a comprehensive suite of tests, including unit, integration, and end-to-end (e2e) tests. **GitHub Actions** handles automated testing in the CI/CD pipeline, and tests can also be run locally.

- **Run Backend Tests**:
  ```bash
  cd back
  npm run test
  ```

- **Run Frontend Tests**:
  ```bash
  cd ../front
  npm run test
  ```

## Production Setup

### 1. PM2 Process Management
Use PM2 to manage Node processes for a zero-downtime setup.

1. **Navigate to the `admin` folder** and use the provided PM2 ecosystem file:
   ```bash
   cd ../admin
   pm2 start ecosystem.config.js
   ```

2. **Monitor with PM2**:
   ```bash
   pm2 monit
   ```

### 2. Nginx Configuration
To serve the application with Nginx, use the provided configuration file in the `admin` folder:

1. **Copy Nginx Configuration**:
   Place the `nginx.conf` from `admin` into your Nginx configuration directory (usually `/etc/nginx/sites-available`), and create a symbolic link in `/etc/nginx/sites-enabled`.

2. **Reload Nginx**:
   ```bash
   sudo systemctl reload nginx
   ```

## CI/CD Pipeline

GitHub Actions are configured to handle automated testing and deployment. A self-hosted runner can be set up to speed up testing:

1. **Set Up Self-Hosted Runner**:
   Follow the instructions in `.github/workflows/` to create a self-hosted runner for faster testing during development.

2. **Use GitHub Actions Commands**:
   - Refer to the `.pipeline.yml` file in `admin` for CI/CD setup.
   - The pipeline automates build, testing, and deployment steps as defined in GitHub Actions workflows.

## Documentation

Full documentation is generated with **Jekyll** and is available in the `docs` folder. To view documentation locally:

1. **Navigate to `docs`**:
   ```bash
   cd ../docs
   ```

2. **Serve Documentation**:
   ```bash
   bundle exec jekyll serve
   ```

   Documentation will be available at `http://localhost:4000`.

For live documentation, visit [https://nilsriga.github.io/currency/](https://nilsriga.github.io/currency/).
