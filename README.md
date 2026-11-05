# ⚽ Cabby Sports

### Latest Sports News, Updates & Stories

Cabby Sports is a modern sports media platform built to deliver football news, match fixtures, results, transfer updates, and stories from around the world. The platform also highlights African football and grassroots competitions, bringing greater visibility to emerging talent and local football communities.

Designed with a responsive interface and a dedicated administration dashboard, Cabby Sports aims to make sports coverage accessible, engaging, and easy to navigate.

**Live Website:** https://cabbysports.vercel.app/

**Backend API:** https://cabby-sports-api.onrender.com

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)
- [Security](#-security)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌍 Overview

Cabby Sports combines sports journalism with a modern digital experience. Users can explore the latest headlines, follow football competitions, check fixtures and results, discover transfer stories, and read coverage of African and grassroots football.

The platform uses a React frontend, a Node.js and Express backend, and MongoDB for data storage.

The project is designed to support future improvements, including expanded football data integrations, automated content workflows, and richer coverage of local competitions.

## ✨ Features

### 📰 Sports News
- Browse the latest sports and football stories.
- View individual news articles.
- Explore trending stories and breaking news headlines.
- Search and navigate sports content.

### ⚽ Football Coverage
- Dedicated football news section.
- Coverage of major competitions and clubs.
- Access to fixtures and match results.
- Transfer news and player movement updates.

### 🌍 African Football
- Dedicated African football coverage.
- News related to African clubs, countries, and competitions.
- Coverage of CAF competitions and continental football.

### 🏆 Grassroots Football
- Dedicated section for grassroots football stories.
- Coverage of emerging players, academies, and local competitions.
- A platform for highlighting developing football talent.

### 📅 Fixtures & Results
- Browse upcoming fixtures.
- View match results.
- Access individual match details where available.

### 🔄 Transfer Coverage
- Explore transfer news and updates.
- View transfer details, including clubs involved where available.

### 🔐 Administration Dashboard
- Protected administrator access.
- Manage news articles and sports content.
- Manage teams, fixtures, results, and transfers.
- Support for uploading article images.
- Authentication using JSON Web Tokens (JWT).

### 📱 Responsive Design
- Responsive interface for desktop, tablet, and mobile devices.
- Navigation designed for convenient browsing.
- A modern sports-media visual identity.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development and build tooling |
| React Router | Client-side navigation |
| Bootstrap / CSS | Responsive layouts and styling |
| Node.js | Backend JavaScript runtime |
| Express.js | REST API and server-side routing |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modelling |
| JSON Web Token (JWT) | Authentication |
| Cloudinary | Image hosting and media uploads, where configured |
| API-Football | Football data integration |
| Vercel | Frontend hosting |
| Render | Backend hosting |
| Git & GitHub | Version control and source code management |

---

## 🏗️ Project Architecture

The project is organised into separate frontend and backend applications.

```text
cabby-sports/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── src/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── models/
│   ├── app.js
│   └── server.js
│
├── package.json
├── .gitignore
└── README.md
```

*Note: This is a representative structure. Adjust the folder names to match the actual repository.*

---

## 🚀 Getting Started

Follow these steps to run Cabby Sports locally.

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/)
- npm, included with Node.js
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account or a local MongoDB instance
- Git
- Optional: Cloudinary and API-Football credentials if you use those integrations locally

### 1. Clone the Repository

```bash
git clone https://github.com/Cabby4/cabby-sports-backend.git
```

For a separate frontend repository, clone its repository URL as well. If the frontend and backend are stored together, clone the main project repository instead.

### 2. Install Dependencies

Navigate to the backend directory and install its dependencies:

```bash
cd cabby-sports-backend
npm install
```

Then navigate to the frontend directory, if it is maintained separately:

```bash
cd client
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory and configure the variables required by your application.

See [Environment Variables](#-environment-variables) below.

### 4. Start the Backend

From the backend directory, run the development script defined in `package.json`. For example, if your project has a `dev` script:

```bash
npm run dev
```

Alternatively, if your entry point is `src/server.js` and no development script is configured:

```bash
node src/server.js
```

### 5. Start the Frontend

From the frontend directory:

```bash
npm run dev
```

Vite will display the local development URL in your terminal, commonly `http://localhost:5173`.

Open that address in your browser.

---

## 🔐 Environment Variables

Never commit passwords, database credentials, API keys, or JWT secrets to GitHub.

### Backend `.env`

Configure the variables supported by your backend. A typical configuration may look like this:

```env
PORT=4001
NODE_ENV=development

MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_long_random_secret

CLIENT_URL=http://localhost:5173

API_FOOTBALL_KEY=your_api_football_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Important:** Use the exact variable names expected by your existing application. For example, if your database connection uses `MONGO_URI` instead of `MONGODB_URI`, retain the name used in your code. Remove optional variables for services you do not use.

Use a strong, unique JWT secret and never publish its value.

### Frontend `.env`

For a Vite application, the API base URL can be configured using a variable such as:

```env
VITE_API_URL=http://localhost:4001/api
```

For production, set it to the deployed API URL with the appropriate API prefix:

```env
VITE_API_URL=https://cabby-sports-api.onrender.com/api
```

Confirm the expected prefix and environment variable name in your existing API service before using these examples.

After changing environment variables, restart the development server or redeploy the relevant application.

---

## ▶️ Running the Application

The frontend and backend run as separate processes when developed locally.

| Application | Example address |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend | `http://localhost:4001` |
| Production frontend | https://cabbysports.vercel.app/ |
| Production backend | https://cabby-sports-api.onrender.com |

The backend port and API routes depend on your configuration.

---

## 🔌 API Integration

Cabby Sports uses an Express REST API to support communication between the frontend and backend.

The backend handles requests for content and other resources supported by the application.

Examples of API resource categories include:

- News
- Teams
- Fixtures
- Results
- Transfers
- Authentication
- Image uploads

The application also supports integration with API-Football for football data workflows.

Actual endpoints, authentication requirements, and automated update schedules depend on the current backend implementation and configuration.

---

## ☁️ Deployment

### Frontend — Vercel

1. Push the frontend code to GitHub.
2. Import the repository into Vercel.
3. Configure the correct project root directory.
4. Set the production API environment variable.
5. Deploy the application.
6. Test navigation, article links, images, and API requests.

### Backend — Render

1. Connect the backend GitHub repository to Render.
2. Select the Node.js web service configuration.
3. Configure the correct root directory and start command.
4. Add the required environment variables.
5. Configure CORS to allow requests from the deployed frontend.
6. Deploy and inspect the service logs.
7. Test the API and confirm the database connection.

### Database — MongoDB Atlas

1. Create or select a MongoDB Atlas cluster.
2. Configure database access credentials.
3. Configure network access securely.
4. Add the connection string to Render's environment variables.
5. Confirm that the backend can connect successfully.

Keep credentials in environment variables rather than source code.

---

## 🛡️ Security

Cabby Sports is designed with the following security considerations:

- JWT-based administrator authentication.
- Protected administrative routes.
- Server-side validation of incoming data.
- Secure management of environment variables.
- CORS configuration for trusted frontend origins.
- Appropriate restrictions on image uploads and request sizes.
- Database access controls and secure connection strings.

Security controls should be verified against the actual backend implementation before production use.

---

## 🔮 Future Improvements

Potential areas for continued development include:

- More comprehensive live football data integration.
- Automated fixture and results synchronisation.
- Improved standings and league coverage.
- Expanded African football reporting.
- More grassroots football profiles and academy coverage.
- Enhanced search and content discovery.
- Improved performance, caching, and accessibility.
- Additional analytics and editorial tools.

---

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the affected functionality.
5. Commit your changes with a descriptive message.
6. Open a pull request explaining the changes.

Please avoid committing secrets, credentials, or environment files.

---

## 📄 License

## Copyright and Usage

Copyright © 2026 Cabby Sports. All rights reserved.

Cabby Sports, including its original source code, proprietary design elements, branding, and original content, is protected by applicable intellectual property laws.

Unless expressly authorised in writing by the relevant rights holder, no permission is granted to reproduce, redistribute, modify, republish, or commercially exploit this project's proprietary materials.

Third-party libraries, packages, images, logos, and other materials remain subject to their respective owners' rights and applicable licences.

For commercial licensing, partnerships, or permission to use proprietary materials, please contact the project owner.

---

## 📬 Contact

**Project:** Cabby Sports

**Live Website:** https://cabbysports.vercel.app/

**Backend Repository:** https://github.com/Cabby4/cabby-sports-backend.git

For project enquiries, collaboration opportunities, or technical feedback, contact the project maintainer through the appropriate repository or website contact channel.

---

*Cabby Sports — Latest Sports News, Updates & Stories.*
