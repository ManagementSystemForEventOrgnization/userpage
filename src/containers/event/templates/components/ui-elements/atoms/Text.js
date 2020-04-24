import React from 'react';
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import { Modal, Button } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
// import { SaveOutlined } from '@ant-design/icons';

import EditText from '../shares/EditText';
import PaddingAndMargin from '../shares/PaddingAndMargin';
import ChangeColorModal from '../shares/ChangeColorModal';


const exampleText = 'Pellentesque ullamcorper tortor ut auctor consequat. Nullam sed nisi massa. Aliquam eget enim nunc. Praesent blandit blandit ornare. Sed lacinia felis quis elit luctus, et tincidunt elit aliquam. Sed porttitor eros id purus sollicitudin, quis pellentesque nunc pulvinar. Ut accumsan a sem quis dignissim. Sed lacus mauris, efficitur ac lobortis id, faucibus at quam. Praesent quis metus hendrerit, vulputate nibh vel, eleifend nibh. Donec cursus, elit id auctor porta, orci felis condimentum est, ut bibendum lacus elit non mi.'

class TextsBlock extends React.Component {
    constructor(props) {
        super(props);

        const { content, style } = this.props;
        this.state = {
            isEditor: true,
            visible: false,
            content: content || exampleText,
            margin: [1, 1, 1, 1],
            padding: [1, 1, 1, 1],
            background: "none",
            fontSize: style ? style.fontSize ? style.fontSize : 20 : 20,
            fonts: "Times New Roman",
            lineText: 80,
            letterSpacing: 0,
            textAlign: style ? style.textAlign ? style.textAlign : 'left' : 'left',
            tranform: ' ',
            color: style ? style.color ? style.color : "black" : 'black',
            fontWeight: style ? style.fontWeight ? style.fontWeight : 'normal' : 'normal',
        };
    }
    showEditor = () => {

        this.setState({
            isEditor: false
        })
    }
    showEditorText = () => {
        this.setState({
            isEditor: true,
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    handleEditorChange = (content) => {
        const { id, handleOnChangeTextBlock } = this.props;
        this.setState({ content });
        console.log("conten", content);

        if (id) {
            handleOnChangeTextBlock(id, ReactHtmlParser(content)[0].props.children[0]);
        }
        console.log(this.state.content);
    }

    handleChangeFonts = value => {
        this.setState({
            fonts: value
        })
    }

    handleChangeFontSize = value => {
        this.setState({
            fontSize: value
        })
    }
    handleChangeLetterSpacing = value => {
        this.setState({
            letterSpacing: value
        })
    }
    handleChangeLineHeight = value => {
        this.setState({
            lineText: value
        })
    }

    handleChangeTextAlign = value => {
        this.setState({
            textAlign: value
        })
    }

    handleChangeTextTranform = value => {
        this.setState({
            tranform: value
        })
    }
    handleChangeTextColor = value => {
        this.setState({
            color: value
        })
        console.log(this.state.color);
    }

    handleChangeBackground = value => {
        this.setState({
            background: value
        })
    }

    handleChangeMargin = value => {
        this.setState({
            margin: value,
        })
    }

    handleChangePadding = value => {
        this.setState({
            padding: value,
        })
    }

    handleReset = () => {

    }

    render() {

        const { key, leftModal, editable } = this.props;
        const { content, margin, padding,
            background, fontSize, fonts, lineText,
            letterSpacing, textAlign, tranform, color, isEditor,
            fontWeight
        } = this.state;


        const divStyle = {

            marginTop: `${margin[0]}%`,
            marginLeft: `${margin[1]}%`,
            marginRight: `${margin[2]}%`,
            marginBottom: `${margin[3]}%`,
            paddingTop: `${padding[0]}%`,
            paddingLeft: `${padding[1]}%`,
            paddingRight: `${padding[2]}%`,
            paddingBottom: `${padding[3]}%`,
            color: color,
            wordBreak: 'break-word',
            alignContent: 'center',
            background: background,
            fontSize: `${fontSize}px`,
            fontFamily: fonts,
            lineHeight: `${lineText}%`,
            letterSpacing: letterSpacing,
            textAlign: textAlign,
            textTransform: tranform,
            fontWeight: fontWeight
            // backgroundImage: `url(${url})`,
            // backgroundPosition: 'center',
            // backgroundSize: 'cover',
            // backgroundRepeat: 'no-repeat',
        }

        return (

            <div className="edittext child-block" style={divStyle} >
                {isEditor ?
                    < div key={key}

                        onClick={this.showEditor}
                    >
                        {ReactHtmlParser(content)}
                    </ div>
                    :
                    <div onClick={() => { this.showEditorText(); this.showModal() }}>
                        <Editor value={content} onEditorChange={this.handleEditorChange}
                            apiKey="6vfxhgd1k6ab1xopelmn5p5nygco7vcmx1c5sl6nu4w8bwun"
                            init={{
                                plugins: 'link   ',
                                toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright insert link format textcolor  | code'
                            }} />
                    </div>
                }


                {
                    editable &&

                    <Modal
                        title="Text"
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        width={500}
                        className={leftModal ? " mt-3 float-left ml-5" : "float-right mr-3 mt-3"}
                        style={leftModal ? { top: 40, left: 200 } : { top: 40 }}
                        footer={[
                            <Button key="ok" onClick={this.handleCancel} type="primary">
                                OK
                             </Button>,
                            <Button key="ok" onClick={this.handleReset} type="primary">
                                Reset
                            </Button>,
                        ]}
                    >


                        <EditText
                            fonts={fonts}
                            fontSize={fontSize}
                            lineText={lineText}
                            letterSpacing={letterSpacing}

                            padding={padding}
                            margin={margin}
                            color={color}
                            background={background}

                            handleChangeFonts={this.handleChangeFonts}
                            handleChangeFontSize={this.handleChangeFontSize}
                            handleChangeLetterSpacing={this.handleChangeLetterSpacing}
                            handleChangeLineHeight={this.handleChangeLineHeight}

                            handleChangeTextAlign={this.handleChangeTextAlign}
                            handleChangeTextTranform={this.handleChangeTextTranform}
                        />

                        <div className="mt-5 pl-2">
                            <PaddingAndMargin
                                padding={padding}
                                margin={margin}
                                color={color}
                                handleChangeColor={this.handleChangeTextColor}
                            />
                            <ChangeColorModal
                                title="Change background"
                                color={background}
                                handleChangeColor={this.handleChangeBackground}
                            />
                        </div>
                    </Modal>}
            </div >
        )
    }
}


const mapStateToProps = state => ({
    // map state of store to props


})

const mapDispatchToProps = (dispatch) => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(TextsBlock)
