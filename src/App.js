import React, { lazy, useEffect, useState } from 'react'
import './App.css';
import 'react-notifications/lib/notifications.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change'
import query from './utils/query';
import checkAuth from './app/auth';
import initializeApp from './app/init';

import { NotificationContainer } from 'react-notifications';
import { useDispatch } from 'react-redux';
import { login } from './features/common/userSlice'

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationJA from "./locales/ja/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ja: {
    translation: translationJA,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lang') || 'ja',
  fallbackLng: "ja",
  interpolation: {
    escapeValue: false,
  },
});

// Importing pages
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Register = lazy(() => import('./pages/Register'))
const Documentation = lazy(() => import('./pages/Documentation'))

// Initializing different libraries
initializeApp()

// Check for login and initialize axios
const token = checkAuth()

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      query.get('/login', (data) => {
        dispatch(login(data.user))
      })
    }
  }, [])

  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false)
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/documentation" element={<Documentation />} />

          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />

          <Route path="*" element={<Navigate to={token ? "/app/calendar" : "/login"} replace />} />

        </Routes>
      </Router>
      <NotificationContainer />
    </>
  )
}

export default App
