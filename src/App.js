import i18n from "i18next";
import React, { lazy, useEffect } from 'react';
import { initReactI18next } from "react-i18next";
import { NotificationContainer } from 'react-notifications';
import { useDispatch } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { themeChange } from 'theme-change';

import checkAuth from './app/auth';
import initializeApp from './app/init';
import query from './utils/query';

import { login } from './features/common/userSlice';

import translationEN from "./locales/en/translation.json";
import translationJA from "./locales/ja/translation.json";

import 'react-notifications/lib/notifications.css';
import './App.css';

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

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

initializeApp()

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
    themeChange(false)
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/app/*" element={<Layout />} />

          <Route path="*" element={<Navigate to={token ? "/app/calendar" : "/login"} replace />} />

        </Routes>
      </Router>
      <NotificationContainer />
    </>
  )
}

export default App;
