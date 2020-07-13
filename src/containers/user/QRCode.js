import React, { Component } from 'react'
import { connect } from 'react-redux';
import QRCode from 'qrcode.react'

class QRCodes extends Component {

    render() {

        return (
            <div className="shadow p-3 mb-5 bg-white rounded  mb-5 mt-5 p-5 border rounded bg-secondary">
                <div className="d-flex justify-content-center pt-5">
                    <div>
                        <h4 className="w3-text-teal">{this.props.title ? this.props.title : "QR Code: "}</h4>
                        <div style={{ maxWidth: '250px' }}>
                            {this.props.day && <div><b>Date:</b>  {new Date(this.props.day).toLocaleString()}</div>}
                        </div>
                        {this.props.QrValue && <QRCode style={{ minWidth: 250, minHeight: 250, marginTop: 30, marginBottom: 50 }} value={this.props.QrValue} />}
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
        errMessage: state.user.errMessage,
    };
};

export default connect(mapStateToProps, null)(QRCodes);
