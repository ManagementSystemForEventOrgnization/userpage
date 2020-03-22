import React from 'react';
import '../styles/Header.scss';

class Header extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            // state variables 
        }
    }

    render(){
        return(
            <h1>This is header</h1>
        )
    }

}


export default Header;