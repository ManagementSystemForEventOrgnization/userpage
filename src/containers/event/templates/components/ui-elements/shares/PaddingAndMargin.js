import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { InputNumber } from 'antd'

class PaddingAndMargin extends Component {

    onChangePadding = (type, value) => {
        const { padding, handleChangePadding } = this.props;
        if (!handleChangePadding) return;
        let temp = [...padding];
        temp[type] = value;
        handleChangePadding(temp);
    }

    onChangeMargin = (type, value) => {
        const { margin, handleChangeMargin } = this.props;
        if (!handleChangeMargin) return;
        let temp = [...margin];

        temp[type] = value;
        handleChangeMargin(temp);

    }

    render() {
        const { margin, padding } = this.props;
        return (
            <div>
                {
                    margin &&
                    <div className=" mt-4 d-flex" >
                        <h6 className=" mr-5">Margin(T-L-R-B)</h6>
                        {
                            margin.map((item, index) =>
                                <InputNumber
                                    key={index}
                                    value={item}
                                    className="mr-1"
                                    min={0} max={1500}
                                    onChange={value => this.onChangeMargin(index, value)}  ></InputNumber >

                            )
                        }
                    </div>
                }

                {
                    padding &&
                    <div className=" mt-4 d-flex" >
                        <h6 className=" mr-5">Padding(T-L-R-B)</h6>
                        {
                            padding.map((item, index) =>
                                <InputNumber
                                    value={item}
                                    className="mr-1"
                                    key={index}
                                    min={0} max={1500}
                                    onChange={value => this.onChangePadding(index, value)}  ></InputNumber >
                            )
                        }     </div>

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