import React from 'react';
import { connect } from 'react-redux'
import { Modal, Radio, Divider } from 'antd';
import { orientation } from '../../../constants/atom.constant'
import { DividerState } from '../stateInit/DividerState'

class DividersBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...DividerState(orientation)
        }
    }

    componentDidMount = () => {
        this.setState({
            orientationList: orientation
        })
    }

    // common function
    onChangeValue(newValue, valueParam) {
        this.setState({
            [valueParam]: newValue,
        });
    }

    render() {
        const { orientationList, styleFormat } = this.state;
        const { editable } = this.props;

        return (

            <div className=" child-block">
                <div className="mt-2" onClick={() => this.onChangeValue(true, 'isDesign')}>
                    <Divider orientation={styleFormat}>Text </Divider>
                </div>

                {editable && <Modal
                    title="TimePicker design"
                    visible={this.state.isDesign}
                    onOk={this.handleOk}
                    onCancel={() => this.onChangeValue(false, 'isDesign')}
                    width={900}
                    footer={[
                    ]}
                >

                    {/* list timepicker in modal */}
                    <div>
                        <Radio.Group value={styleFormat} onChange={(e) => this.onChangeValue(e.target.value, 'styleFormat')}>
                            {orientationList.map(orienformat =>
                                <Radio value={orienformat} key={orienformat}>
                                    <Divider orientation={orienformat}>{orienformat} </Divider>
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


export default connect(mapStateToProps, mapDispatchToProps)(DividersBlock)
