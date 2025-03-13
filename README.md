# Dashboard and Login Screens

## Overview

This project is a React.js application built with Vite that includes a Login screen and a Dashboard screen. The UI is implemented to be pixel-perfect and responsive, using **shadcn** for UI components. The app manages state with Redux or Context API and integrates with the [DummyJSON API](https://dummyjson.com/) to handle authentication and display customer data.

## Features

- **Authentication**: Users can log in using the DummyJSON Auth API.
- **Dashboard**: Displays customer data from the DummyJSON Users API.
- **State Management**: Implemented using Redux or Context API.
- **Component Reusability**: UI elements such as buttons and input fields are reusable.
- **Performance Optimization**: Uses lazy loading and code splitting.
- **Testing**: Unit tests written with Jest or React Testing Library.
- **Responsive UI**: Works seamlessly on mobile and desktop.

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (>=16.x)
- npm or yarn

### Clone the Repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### Install Dependencies

```bash
npm install
```

OR

```bash
yarn install
```

### Install shadcn

shadcn is used for UI components. To set it up, run:

```bash
npx shadcn-ui@latest init
```

Then, install the necessary components:

```bash
npx shadcn-ui@latest add button input card
```

### Start the Development Server

```bash
npm run dev
```

OR

```bash
yarn dev
```

## Usage

### Login Credentials

Use the following credentials to log in:

- **Username**: `emilys`
- **Password**: `emilyspass`

### API Integration

- **Login**: Uses DummyJSON Auth API for authentication.
- **Dashboard**: Fetches customer data from the DummyJSON Users API.

## Project Structure

```
📂 src
 ├── 📂 components  # Reusable UI components
 ├── 📂 pages       # Login and Dashboard pages
 ├── 📂 store       # Redux/Context API store
 ├── 📂 hooks       # Custom hooks
 ├── 📂 styles      # Global styles and Tailwind configuration
 ├── 📂 utils       # Helper functions
 ├── App.jsx        # Main app component
 ├── main.jsx       # Entry point
```

## Performance Optimization

- **Lazy Loading**: Implemented for better performance.
- **Code Splitting**: Ensures efficient loading.

## Testing

Unit tests are written using Jest or React Testing Library. Run tests with:

```bash
npm run test
```

OR

```bash
yarn test
```

## Deployment

To build the app for production:

```bash
npm run build
```

## Contributing

Feel free to submit issues or contribute by creating pull requests.

## License

This project is licensed under the MIT License.

---

**Happy Coding! 🚀**

