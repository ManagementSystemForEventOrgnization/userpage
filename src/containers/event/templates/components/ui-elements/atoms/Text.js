import React from 'react';
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
import { Modal, Tabs, Button } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { SaveOutlined } from '@ant-design/icons';
import EditText from '../shares/EditText';


const { TabPane } = Tabs;
const exampleText = 'Pellentesque ullamcorper tortor ut auctor consequat. Nullam sed nisi massa. Aliquam eget enim nunc. Praesent blandit blandit ornare. Sed lacinia felis quis elit luctus, et tincidunt elit aliquam. Sed porttitor eros id purus sollicitudin, quis pellentesque nunc pulvinar. Ut accumsan a sem quis dignissim. Sed lacus mauris, efficitur ac lobortis id, faucibus at quam. Praesent quis metus hendrerit, vulputate nibh vel, eleifend nibh. Donec cursus, elit id auctor porta, orci felis condimentum est, ut bibendum lacus elit non mi.'

class TextsBlock extends React.Component {
  constructor(props) {
    super(props);

    const { content } = this.props;
    this.state = {

      visible: false,
      isEditor: true,
      content: content || exampleText,
      margin: [0, 0, 0, 0],
      padding: [0, 0, 0, 0],
      background: "white",
      fontSize: 20,
      fonts: "Times New Roman",
      lineText: 80,
      letterSpacing: 0,
      textAlign: '',
      tranform: ' ',
      color: "black",
      height: this.props.height || 50,
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

  render() {

    const { key } = this.props;
    const { content, margin, padding, isEditor,
      background, fontSize, fonts, lineText, letterSpacing, textAlign, tranform, color

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
    }

    return (

      <div className="edittext child-block" style={divStyle} >

        < div key={key}

          onClick={() => { this.showEditor(); this.showModal() }}
        >
          {ReactHtmlParser(content)}
        </ div>



        <Modal
          title="Text"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width={600}
          style={{ marginLeft: '50%' }}


          footer={[
            <Button key="ok" onClick={this.handleCancel} type="primary">
              OK
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
            handleChangeTextColor={this.handleChangeTextColor}
            handleChangeBackground={this.handleChangeBackground}

            handleChangeMargin={this.handleChangeMargin}
            handleChangePadding={this.handleChangePadding}

          />

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
