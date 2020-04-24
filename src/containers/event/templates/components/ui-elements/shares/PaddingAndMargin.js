import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { InputNumber } from 'antd'

class PaddingAndMargin extends Component {

    handleChangeMarginT = value => {
        const { margin, handleChangeMargin } = this.props;
        if (!handleChangeMargin) return;
        let temp = [...margin];
        temp[0] = value;
        handleChangeMargin(temp);

    }

    handleChangeMarginL = value => {
        const { margin, handleChangeMargin } = this.props;
        if (!handleChangeMargin) return;
        let temp = [...margin];
        temp[1] = value;
        handleChangeMargin(temp);
    }

    handleChangeMarginR = value => {
        const { margin, handleChangeMargin } = this.props;
        if (!handleChangeMargin) return;
        let temp = [...margin];
        temp[2] = value;
        handleChangeMargin(temp);
    }

    handleChangeMarginB = value => {
        const { margin, handleChangeMargin } = this.props;
        if (!handleChangeMargin) return;
        let temp = [...margin];
        temp[3] = value;
        handleChangeMargin(temp);
    }

    handleChangePaddingT = value => {
        const { padding, handleChangePadding } = this.props;
        if (!handleChangePadding) return;
        let temp = [...padding];
        temp[0] = value;
        handleChangePadding(temp);
    }

    handleChangePaddingL = value => {
        const { padding, handleChangePadding } = this.props;
        if (!handleChangePadding) return;
        let temp = [...padding];
        temp[1] = value;
        handleChangePadding(temp);
    }

    handleChangePaddingR = value => {
        const { padding, handleChangePadding } = this.props;
        if (!handleChangePadding) return;
        let temp = [...padding];
        temp[2] = value;
        handleChangePadding(temp);
    }

    handleChangePaddingB = value => {
        const { padding, handleChangePadding } = this.props;
        if (!handleChangePadding) return;
        let temp = [...padding];
        temp[3] = value;
        handleChangePadding(temp);
    }


    render() {
        const { margin, padding } = this.props;
        return (
            <div>
                {
                    margin &&
                    <div className=" mt-4 d-flex" >
                        <h6 className=" mr-5">Margin (T-L-R-B)</h6>
                        <InputNumber
                            value={margin[0]}
                            className="mr-1"
                            name="marginT"
                            min={0} max={1500}
                            onChange={this.handleChangeMarginT}  ></InputNumber >

                        <InputNumber
                            value={margin[1]}
                            className="mr-1"
                            name="marginL"
                            min={0} max={1500}
                            onChange={this.handleChangeMarginL}  ></InputNumber >

                        <InputNumber
                            value={margin[2]}
                            className="mr-1"
                            name="marginR"
                            min={0} max={1500}
                            onChange={this.handleChangeMarginR}  ></InputNumber >
                        <InputNumber
                            value={margin[3]}
                            name="marginB"
                            min={0} max={1500}
                            onChange={this.handleChangeMarginB}  ></InputNumber >
                    </div>

                }

                {
                    padding &&
                    <div className=" mt-4 d-flex" >
                        <h6 className=" mr-5">Padding (T-L-R-B)</h6>
                        <InputNumber
                            value={padding[0]}
                            className="mr-1"
                            name="paddingT"
                            min={0} max={1500}
                            onChange={this.handleChangePaddingT}  ></InputNumber >

                        <InputNumber
                            value={padding[1]}
                            className="mr-1"
                            name="paddingL"
                            min={0} max={1500}
                            onChange={this.handleChangePaddingL}  ></InputNumber >

                        <InputNumber
                            value={padding[2]}
                            className="mr-1"
                            name="paddingR"
                            min={0} max={1500}
                            onChange={this.handleChangePaddingR}  ></InputNumber >
                        <InputNumber
                            value={padding[3]}
                            className="mr-1"
                            name="paddingB"
                            min={0} max={1500}
                            onChange={this.handleChangePaddingB}  ></InputNumber >
                    </div>

                }


            </div>
        )
    }
}


PaddingAndMargin.propTypes = {
    margin: PropTypes.array,
    padding: PropTypes.array,
    handleChangePadding: PropTypes.func,
    handleChangeMargin: PropTypes.func,
};

export default PaddingAndMargin;