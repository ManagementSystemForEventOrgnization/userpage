import React, { Component } from 'react'
import Footer from '../containers/share/_layout/Footer'
import Header from '../containers/share/_layout/Header';

export default class NotFoundPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                Not Found Page
                <Footer/>
            </div>
        )
    }
}
