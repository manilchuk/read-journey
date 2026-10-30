# Read Journey

**Read Journey** is a web application for tracking your reading progress. It allows users to create a personal library, add books from recommendations, track reading progress (pages, time, speed), and view statistics as a diary or a chart.

## 📋 Table of Contents

- [Technologies](#-technologies)
- [Design & Documentation](#-design--documentation)
- [Installation & Running](#-installation--running)
- [Project Structure](#-project-structure)
- [Implementation Features](#-implementation-features)
- [Deployment](#-deployment)
- [Author](#-author)

## 🚀 Technologies

- **React** (v18+) — UI library.
- **TypeScript** — static typing.
- **Vite** — fast bundler.
- **React Router DOM** — routing.
- **Redux Toolkit** — state management (authentication).
- **Formik + Yup** — forms and validation.
- **Axios** — HTTP client for API requests.
- **React Hot Toast** — notifications.
- **CSS Modules** — styling.
- **Gilroy** — font from the design.

## 🔗 Design & Documentation

- [Figma design](https://www.figma.com/file/z3m0rdBcEfLTJUBDkAKhWQ/BOOKS-READING?type=design&node-id=18743%3A4973&mode=design&t=Hi1KTaUJMogWXZzz-1)
- [API documentation](https://readjourney.b.goit.study/api-docs/)
- [Technical specification (TS)](https://docs.google.com/spreadsheets/d/1_f4IZzXDs6QhQq3mOCOMktYasPW1XphdTO82rdrkyW8/edit?gid=1060862504#gid=1060862504)

## 📦 Installation & Running

1. Clone the repository:

```bash
git clone https://github.com/manilchuk/read-journey.git
```

2. Navigate to the project folder:

```bash
cd read-journey
```

3. Install dependencies:

```bash
npm install
```

4. Run the project in development mode:

```bash
npm run dev
```

5. Open http://localhost:5173 in your browser.

## 🏗️ Project Structure

src/
├── assets/ # Images, icons, fonts
├── components/ # UI components
├── hooks/ # Custom hooks
├── pages/ # Pages
├── redux/ # Redux store and slices
├── services/ # API requests
├── styles/ # Global styles and variables
├── types/ # TypeScript types
├── utils/ # Utilities (validation, error handling)
├── App.tsx # Main component
├── index.css # Global styles
└── main.tsx # Entry point

## 🎨 Implementation Features

- Responsive design (MobileFirst): mobile (320px-767px), tablet (768px+), desktop (1440px+).
- Form validation using Formik + Yup (email pattern from TS).
- Route protection (PrivateRoute / PublicRoute).
- Server-side pagination for the Recommended Page.
- Book filtering in the library by status.
- Modals (closing by cross icon, backdrop, ESC).
- Notifications (react-hot-toast) for errors and successes.

## 🌐 Deployment

The project is deployed on Vercel: [Read Journey](https://read-journey-твій-нік.vercel.app).

## 👤 Author

Valentyn Manilchuk

GitHub: [@manilchuk](https://github.com/manilchuk).
