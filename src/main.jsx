import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import LogIn from "./register/logIn.jsx";
import SignIn from "./register/signIn.jsx";
import MainPage from "./pages/mainPage/mainPage.jsx";
import MenuPage from "./pages/menuPage/menuPage.jsx";
import FlowPage from "./pages/flowPage/flowPage.jsx";
import ConfigPage from "./pages/configPage/configPage.jsx";
import HomePage from "./pages/homePage/homePage.jsx";
import ProblemsPage from "./pages/problemsPage/problemsPage.jsx";
import EquipPage from "./pages/equipPage/equipPage.jsx";
import InventoryPage from "./pages/inventoryPage/inventoryPage.jsx";
import ProtectedRoute from "./ProtectedRoute";
import ChatPage from "./pages/chatPage/chatPage.jsx";
import TasksPage from "./pages/tasksPage/tasksPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/mainPage",
        element: <MainPage />,
      },
    ],
  },
  {
    path: "/logIn",
    element: <LogIn />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/menuPage",
    element: (
      <ProtectedRoute>
        <MenuPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/flowPage",
    element: <FlowPage />,
  },
  {
    path: "/configPage",
    element: (
      <ProtectedRoute>
        <ConfigPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/homePage",
    element: <HomePage />,
  },
  {
    path: "/problemsPage",
    element: <ProblemsPage />,
  },
  {
    path: "/equipPage",
    element: <EquipPage />,
  },
  {
    path: "/configPage",
    element: <ConfigPage />,
  },
  {
    path: "inventoryPage",
    element: <InventoryPage />,
  },
  {
    path: "/chatPage",
    element: <ChatPage />,
  },
  {
    path: "/tasksPage",
    element: <TasksPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
