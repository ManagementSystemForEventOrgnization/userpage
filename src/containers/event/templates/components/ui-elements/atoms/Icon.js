import React from 'react';
import { connect } from 'react-redux'
import { Modal, Radio } from 'antd';

import { IconFont, iconName } from '../../../constants/atom.constant'
import { IconState } from '../stateInit/IconState'

class IconBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...IconState(iconName)
    }
  }

  componentDidMount = () => {
    this.setState({
      iconNameList: iconName,
    })
  }

  // common function
  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
  }

  render() {
    const { iconNameList, styleFormat } = this.state;
    const { editable } = this.props;

    return (
      <div className="child-block">
        <div className="mt-2" onClick={() => this.onChangeValue(true, 'isDesign')}>
          Icons
          <IconFont type={styleFormat} />
        </div>

        {editable && <Modal
          title="Icons design"
          visible={this.state.isDesign}
          onOk={this.handleOk}
          onCancel={() => this.onChangeValue(false, 'isDesign')}
          width={500}
          footer={[
          ]}
        >

          {/* list datepicker in modal */}
          <div>
            <Radio.Group value={styleFormat} onChange={(e) => this.onChangeValue(e.target.value, 'styleFormat')}>
              {iconNameList.map(dateformat =>
                <Radio value={dateformat} key={dateformat} >
                  <IconFont type={dateformat} />
                </Radio>
              )}
            </Radio.Group>

          </div>
        </Modal>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  // map state of store to props
})

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(IconBlock)
