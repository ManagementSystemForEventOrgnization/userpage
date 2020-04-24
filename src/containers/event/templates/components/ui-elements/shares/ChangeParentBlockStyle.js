import React, { Component } from 'react'
import {
    Slider, InputNumber
} from 'antd'

import PaddingAndMargin from './PaddingAndMargin';
import UploadImage from './UploadImage';
import ChangeColorModal from './ChangeColorModal';


class ChangeParentBlockStyle extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
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

        const opacityDiv = <div className="row mt-1">
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
                <div className='mt-5'>
                    <ChangeColorModal
                        title="Change Background Color"
                        color={bgColor}
                        handleChangeColor={handleChangeColor}
                    />
                </div>

                {opacityDiv}

                <div className='mt-3'>
                    <UploadImage
                        url={url}
                        handleImageDrop={handleChangeImage}
                    />
                </div>
            </div>
        )
    }
}

export default ChangeParentBlockStyle
