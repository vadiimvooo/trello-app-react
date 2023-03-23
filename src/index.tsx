import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import TasksPage from './pages/TasksPage/TasksPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
     <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<MainPage />} />

            <Route path="/tasks">
              <Route index element={<TasksPage />} />
            </Route>

            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="*" element={<NotFoundPage />} />
      </Route>
        </Routes>
      </HashRouter>
  </Provider>
);
