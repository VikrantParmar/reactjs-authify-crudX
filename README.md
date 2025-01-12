![ReactJS](https://img.shields.io/badge/React-%2361DAFB.svg?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000.svg?style=flat&logo=jsonwebtokens&logoColor=white)

# React App with Vite and Laravel JWT Authentication 🚀

This is a React application built with Vite, integrated with a Laravel backend using JWT (JSON Web Token) for authentication. The app includes several features and functionalities, along with routing, state management, and API integrations.

## ⭐ Features

### Completed Features

- **Material UI Theme Setup**: Integrated Material UI for a modern and responsive UI.
- **Register Process**: Users can create an account by providing necessary details.
- **Login Process**: Users can authenticate via JWT tokens.

### Under Development

- **Forgot and Reset Password**: Users will be able to reset their password using email-based verification.
- **Profile Management**: Users can view and update their profile information.
- **Change Password**: Users will be able to change their password from the settings.
- **Blog Management**: CRUD functionality for managing blog posts.
- **Category Management**: Users can create, edit, and delete blog categories.
- **User Role Wise Category Management**: Role-based access control (RBAC) for managing categories based on user roles.

## Technologies Used

- **React**: Frontend framework for building interactive UIs.
- **Vite**: Next-generation, fast build tool for React.
- **Material UI**: Component library for UI design.
- **Formik & Yup**: Used for form handling and validation.
- **React Router**: For routing between different pages and components.
- **Axios**: HTTP client for making API requests to the Laravel backend.
- **React-Query**: For handling data fetching and caching.
- **React-Redux/React-Slice**: State management for handling global state.

## Getting Started

To get started with this project, clone the repository and follow the steps below.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14.x or above)
- **npm** or **yarn**
- **PHP** (for the Laravel API backend)
- **Composer** (for managing Laravel dependencies)
- **MySQL** (or any database supported by Laravel)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VikrantParmar/reactjs-authify-crudX.git
   cd reactjs-authify-crudX
   ```

2. **Install frontend dependencies: In the root of the project (frontend directory), run:**
   ```bash
   npm install
   ```

3. **Setup Environment Variables:**  
   Create a .env file in the frontend directory and add the API URL.

4. **Run the development servers:**
   ```bash
   npm run dev
   ```

5. **Access the Application Open your browser and navigate to**
   ```bash
   http://localhost:3001
   ```

### Description of Directories/Files:

- **`assets/`**: Contains static files such as images, fonts, and other resources used throughout the app.
- **`components/`**: Includes reusable UI components that are used across different pages and sections of the app.
- **`hooks/`**: Custom hooks are placed here. They encapsulate reusable logic, API calls, or any complex state management that can be shared between components.
- **`store/`**: Contains Redux slices and state management logic. The state is managed globally using `Redux Toolkit` and `React-Slice`.
- **`utils/`**: Utility functions that can be used across the application, such as formatting, validation, etc.
- **`pages/`**: Contains page-level components. These are typically used for routing purposes and represent different views of the application.
- **`App.jsx`**: The main component that sets up the application's layout, routes, and global context.
- **`main.jsx`**: The main entry point for the application. It initializes the app by rendering the `App` component and includes any necessary providers (like Redux or Router).
- **`index.html`**: The entry point for the React app, typically used for rendering the React app into the root DOM element (`index.html`).

---

This structure helps in maintaining clean, modular code by separating concerns based on the functionality of each part of the application. You can expand and add additional directories as the project grows.


## Default Credentials for Testing

| **Role**   | **Username**                      | **Password**   |
|------------|-----------------------------------|----------------|
| **Admin**  | vikrant-admin@example.com         | 123456789      |
| **User**   | vikrant-user@example.com          | 123456789      |
| **User-Inactive**   | vikrant-inactive@example.com          | 123456789      |


### Visit the Laravel APP For APIs GItHub Repository [laravel-jwt-api-crudX](https://github.com/VikrantParmar/laravel-jwt-api-crudX)
### Visit the Postman Docs for more details [Postman Docs](https://documenter.getpostman.com/view/39353609/2sAYJ7geHA)

## Screenshots
<h3 align="center">Home Page</h3>


![HomePage](/src/assets/app-screenshots/HomePage.png "App Home Page")

<h3 align="center">Registration Page</h3>

![RegistrationPage](/src/assets/app-screenshots/RegistrationPage.png "App Registration Page")

![RegistrationPage](/src/assets/app-screenshots/RegistrationPage-Errors.png "App Registration Page Error")

<h3 align="center">Login Page</h3>

![LoginPage](/src/assets/app-screenshots/LoginPage.png "App Login Page")

![LoginPage](/src/assets/app-screenshots/LoginPage-Error.png "App Login Page Error")

### 🌎 Contact

For questions, feedback, or collaboration inquiries, please contact:

Name: Vikrant Parmar  
Email: vikrant.parmar91@gmail.com

Thank you for using this application! 😊  
#VikrantXCode #VikrantParmar
