import React from 'react';
import { Avatar } from 'antd'




class Orgnization extends React.Component {

    render() {
        const { orgnization } = this.props;
        return (
            <div className="orgnization justify-content-between mt-5">
                <Avatar src={orgnization.src} size={160} />
                <div className="hover-text">
                    <p className="name">{orgnization.name}</p>
                    <p className="description">{orgnization.description}</p>
                </div>
            </div>

        );
    }
}

export default Orgnization;
