import React from 'react';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import CategoryDetailPage from '../pages/CategoryDetailPage';
import EventDetailPage from '../pages/EventDetailPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import ProfilePage from '../pages/ProfilePage';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/event-list',
        exact: false,
        main: () => <CategoryDetailPage />
    },
    {
        path: '/event/:id',
        exact: true,
        main: ({ match, history }) => <EventDetailPage match={match} history={history} />
    },
    {
        path: '/login',
        exact: true,
        main: () => <LoginPage />
    },
    {
        path: '/signup',
        exact: true,
        main: () => <SignUpPage />
    },
    {
        path: '/profile',
        exact: true,
        main: () => <ProfilePage />
    },
    {
        path: '',
        exact: true,
        main: () => <NotFoundPage />
    }
];

export default routes;