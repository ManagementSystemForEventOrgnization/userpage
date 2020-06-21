import React, { Component } from 'react'
import QRious from "qrious";
import { connect } from 'react-redux';


class QRCode extends Component {

    componentDidMount() {
        if (this.props.userInfo)
            new QRious({
                element: document.getElementById("qr-div"),
                value: this.props.userInfo._id
            });
    }
    render() {
        return (
            <div className="shadow p-3 mb-5 bg-white rounded  mb-5 mt-5 p-5 border rounded bg-secondary">
                <div className="d-flex justify-content-center pt-5">
                    <div>
                        <h4 className="w3-text-teal">QR Code:</h4>
                        <canvas id="qr-div" style={{ minWidth: 250, minHeight: 250, marginTop: 30, marginBottom: 50 }} />
                    </div>
                    <br />
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        pending: state.user.pending,
        userInfo: state.user.userInfo,
        errMessage: state.user.errMessage,
    };
};

export default connect(mapStateToProps, null)(QRCode);
