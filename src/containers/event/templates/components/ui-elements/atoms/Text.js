import React from 'react';
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import { Modal, Tabs, Button } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
// import { SaveOutlined } from '@ant-design/icons';

import EditText from '../shares/EditText';
import PaddingAndMargin from '../shares/PaddingAndMargin';
import ChangeColorModal from '../shares/ChangeColorModal';
import {TabPane} from '../../../constants/atom.constant';
import {StepState} from '../stateInit/TextState'

class TextsBlock extends React.Component {
  constructor(props) {
    super(props);

   this.state = {
       ...StepState(this.props)
    };
  }

   // common function
   onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
  }


  handleEditorChange = (content) => {
    const { id, handleOnChangeTextBlock, idChild,
      handleOnChangeTextBlockChild,
      handleChangeText
    } = this.props;
    this.setState({ content });

    if (id) {
      if (idChild) {
        handleOnChangeTextBlockChild(id, ReactHtmlParser(content)[0].props.children[0], idChild);
        console.log(ReactHtmlParser(content)[0].props.children[0])
      }
      else {
        handleOnChangeTextBlock(id, ReactHtmlParser(content)[0].props.children[0]);
      }
    }

  }

  render() {

    const { key, leftModal } = this.props;
    const { content, margin, padding,
      background, fontSize, fonts, lineText,
      letterSpacing, textAlign, tranform, color,
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
      fontWeight: fontWeight,

    }

    return (

      <div className="edittext child-block " style={divStyle} >

        < div key={key}
          onClick={() => this.onChangeValue(true, 'visible')}
        >
          {ReactHtmlParser(content)}
        </ div>
        <Modal
          title="Text"
          visible={this.state.visible}
          onCancel={() => this.onChangeValue(false, 'visible')}
          width={500}
          className={leftModal ? " mt-3 float-left ml-5" : "float-right mr-3 mt-3"}
          style={leftModal ? { top: 40, left: 200 } : { top: 40 }}
          footer={[
            <Button key="ok" onClick={() => this.onChangeValue(false, 'visible')} type="primary">
              OK
          </Button>,
            <Button key="ok" onClick={this.handleReset} type="primary">
              Reset
      </Button>,
          ]}
        >
          <Tabs defaultActiveKey="1" >
            <TabPane tab="text " key="1">
              <h6>Nội dung</h6>
              <Editor value={content} onEditorChange={this.handleEditorChange} style={divStyle}
                apiKey="6vfxhgd1k6ab1xopelmn5p5nygco7vcmx1c5sl6nu4w8bwun"
                init={{
                  plugins: 'link   ',
                  toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright insert link format textcolor  | code'
                }} />
            </TabPane>
            <TabPane tab="design " key="2">
              <EditText
                fonts={fonts}
                fontSize={fontSize}
                lineText={lineText}
                letterSpacing={letterSpacing}


                handleChangeFonts={(value) => this.onChangeValue(value, 'fonts')}
                handleChangeFontSize={(value) => this.onChangeValue(value, 'fontSize')}
                handleChangeLetterSpacing={(value) => this.onChangeValue(value, 'letterSpacing')}
                handleChangeLineHeight={(value) => this.onChangeValue(value, 'lineText')}

                handleChangeTextAlign={(value) => this.onChangeValue(value, 'textAlign')}
                handleChangeTextTranform={(value) => this.onChangeValue(value, 'tranform')}
              />

              <div className="mt-5 pl-2">
                <PaddingAndMargin
                  padding={padding}
                  margin={margin}
                  handleChangeMargin={(value) => this.onChangeValue(value, 'margin')}
                  handleChangePadding={(value) => this.onChangeValue(value, 'padding')}
                />
              </div>
              <div className="d-flex mt-5 pl-2">
                <ChangeColorModal
                  title="Change Text Color"
                  color={color}
                  handleChangeColor={(value) => this.onChangeValue(value, 'color')}
                />
                <ChangeColorModal
                  title="Change background"
                  color={background}
                  handleChangeColor={(value) => this.onChangeValue(value, 'background')}
                />
              </div>
            </TabPane>
          </Tabs>
        </Modal>

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
