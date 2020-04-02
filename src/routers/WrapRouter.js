import React from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch, Route
} from 'react-router-dom';

import { userActions } from '../action/user.action';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import CategoryDetailPage from '../pages/CategoryDetailPage';
import EventDetailPage from '../pages/EventDetailPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import ProfilePage from '../pages/ProfilePage';

const ROUTES = [
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

class WrapRouter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            routes: ROUTES,
        }
    }

    componentDidMount = () => {
        const { getCurrentUser } = this.props;
        getCurrentUser();
    }


    UNSAFE_componentWillReceiveProps = (nextProps) => {
        const { isLogined } = nextProps;
        console.log(isLogined)
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
                main: () => !isLogined ? <LoginPage /> : <HomePage />
            },
            {
                path: '/signup',
                exact: true,
                main: () => !isLogined ? <SignUpPage /> : <HomePage />
            },
            {
                path: '/profile',
                exact: true,
                main: () => isLogined ? <ProfilePage /> : <LoginPage />
            },
            {
                path: '',
                exact: true,
                main: () => <NotFoundPage />
            }
        ];

        this.setState({
            routes
        })


    }

    render() {
        const { routes } = this.state;
        return (
            <Router>
                <Switch>
                    {

                        routes.map((route, index) =>
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                            />)
                    }
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogined: state.user.isLogined,
    };
}

const mapDispatchToProps = (dispatch) => ({
    getCurrentUser: () => dispatch(userActions.getCurrentUser())
});



export default connect(mapStateToProps, mapDispatchToProps)(WrapRouter)
