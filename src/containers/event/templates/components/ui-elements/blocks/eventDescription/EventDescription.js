import React, { Component } from 'react'
import {
    Button, Modal,
} from 'antd'


import Text from '../../atoms/Text'
import IconsHandle from '../../shares/IconsHandle';
import ChangeParentBlockStyle from '../../shares/ChangeParentBlockStyle';


class EventDescription extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapse: false,
            margin: [1, 1, 1, 1],
            padding: [7, 1, 1, 7],
            url: '',
            bgColor: 'white',
            opacity: 0.3
        }
    }

    collapseModal = () => {
        const { collapse } = this.state;
        this.setState({
            collapse: !collapse
        })
    }
    handleDuplicate = () => {

    }
    handleDelete = () => {

    }

    onChangeStyle = (type, value) => {
        this.setState({
            [type]: value
        })
    }

    render() {
        const { collapse, padding, url, bgColor, opacity,
            margin } = this.state;

        const { type, editable } = this.props;

        const style = {
            marginTop: `${margin[0]}%`,
            marginLeft: `${margin[1]}%`,
            marginRight: `${margin[2]}%`,
            marginBottom: `${margin[3]}%`,
            paddingTop: `${padding[0]}%`,
            paddingLeft: `${padding[1]}%`,
            paddingRight: `${padding[2]}%`,
            paddingBottom: `${padding[3]}%`,

            position: 'relative',
            backgroundImage: url ? `url(${url})` : 'white',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            backgroundColor: url ? 'none' : bgColor
        }
        const bg = {
            position: 'absolute',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            opacity: opacity,
            backgroundColor: bgColor
        }

        const titleStyle = {
            fontWeight: 'bolder',
            fontSize: '40',
        }

        return (
            <div className="child-block d-flex" >
                <div style={style} >
                    {url &&
                        <div style={bg}></div>}
                    <div className="row">
                        <div className={type === 1 ? "col-sm-6" : 'col-sm-8'}>
                            <Text content="Title 1"
                                style={titleStyle}
                                editable={editable}
                            />
                            <Text editable={editable} />
                        </div>
                        <div className={type === 1 ? "col-sm-6" : "col-sm-4"}>
                            <Text content="Title 2" leftModal={true}
                                style={titleStyle}
                                editable={editable}
                            />
                            <Text leftModal={true} />
                            {
                                type === 3 &&
                                <div className='mt-5'>
                                    <Text content="Title 2" leftModal={true}
                                        editable={editable}
                                        style={titleStyle} />
                                    <Text leftModal={true}
                                        editable={editable}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>


                {editable && <IconsHandle
                    collapseModal={this.collapseModal}
                    handleDuplicate={this.handleDuplicate}
                    handleDelete={this.handleDelete}
                />}
                {editable &&
                    <Modal
                        title="Edit Block"
                        visible={collapse}
                        onCancel={this.collapseModal}
                        width={500}
                        className=" mt-3 float-left ml-5"
                        style={{ top: 40, left: 200 }}
                        footer={[
                            <Button key="ok" onClick={this.collapseModal} type="primary">
                                OK
                         </Button>,
                        ]}
                    >
                        <ChangeParentBlockStyle
                            padding={padding}
                            margin={margin}
                            opacity={opacity}
                            bgColor={bgColor}
                            url={url}

                            handleChangePadding={value => this.onChangeStyle('padding', value)}
                            handleChangeMargin={value => this.onChangeStyle('margin', value)}
                            handleChangeOpacity={value => this.onChangeStyle('opacity', value === 10 ? '1' : `0.${value}`)}
                            handleChangeImage={value => this.onChangeStyle('url', value)}
                            handleChangeColor={value => this.onChangeStyle('bgColor', value)}

                        />
                    </Modal>
                }
            </div>
        )
    }
}

export default EventDescription
