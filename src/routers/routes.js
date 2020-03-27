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
    // {
    //     path: '/product/add',
    //     exact: false,
    //     main: ({history}) => <ProductActionPage history={history}/>
    // },
    {
        path: '/event/:id',
        exact: false,
        main: ({match, history}) => <EventDetailPage match={match} history={history}/>
    },
    {
        path: '/login',
        exact: false,
        main: () => <LoginPage />
    },
    {
        path: '/signup',
        exact: false,
        main: () => <SignUpPage />       
    },
    {
        path: '/profile',
        exact: false,
        main: () => <ProfilePage />       
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundPage />
    }
];

export default routes;