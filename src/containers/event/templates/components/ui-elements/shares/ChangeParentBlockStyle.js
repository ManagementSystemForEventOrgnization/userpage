import React, { Component } from 'react'
import {
    Select, Slider, InputNumber
} from 'antd'

import PaddingAndMargin from './PaddingAndMargin';
import UploadImage from './UploadImage';
import ChangeColorModal from './ChangeColorModal';

const { Option } = Select;

class ChangeParentBlockStyle extends Component {
    constructor(props) {
        super(props)

        this.state = {
            typeBg: ''
        }
    }

    onChange = value => {
        const { handleChangeTypeBG } = this.props;
        if (!handleChangeTypeBG) return;
        this.setState({
            typeBg: value
        })
        handleChangeTypeBG(value);

    }

    render() {
        const {
            padding, margin,
            opacity, bgColor, url,

            handleChangeColor,
            handleChangeImage,
            handleChangeMargin,
            handleChangeOpacity,
            handleChangePadding
        } = this.props;

        const { typeBg } = this.state;

        const opacityDiv = <div className="row">

            <h6 className="col-3">Opacity</h6>


            <Slider
                className="col-6"
                min={0}
                max={10}
                onChange={handleChangeOpacity}
                value={opacity * 10}
            />

            <InputNumber
                className="col-1"
                min={0}
                max={10}
                style={{ margin: '0 16px', borderRadius: '15px' }}
                value={opacity * 10}
                onChange={handleChangeOpacity}
            />
        </div>


        return (
            <div>
                <PaddingAndMargin
                    padding={padding} margin={margin}
                    handleChangePadding={handleChangePadding}
                    handleChangeMargin={handleChangeMargin}

                />

                <div className="d-flex mt-5">
                    <h6 className="mr-5 "> Choose type of background</h6>
                    <Select
                        style={{ width: 180 }}
                        onChange={this.onChange}
                    >
                        <Option value="image">Background Image</Option>
                        <Option value="color">Background Color</Option>
                    </Select>

                </div>

                <div className="">
                    {
                        typeBg ?
                            typeBg === 'image' ?
                                <div className="mt-4">

                                    {opacityDiv}
                                    <UploadImage
                                        url={url}
                                        handleImageDrop={handleChangeImage}
                                    />

                                </div > :
                                <div>
                                    {opacityDiv}
                                    <ChangeColorModal
                                        title="Change Background Color"
                                        color={bgColor}
                                        handleChangeColor={handleChangeColor}
                                    />
                                </div> :
                            null
                    }
                </div>

            </div>
        )
    }
}

export default ChangeParentBlockStyle
