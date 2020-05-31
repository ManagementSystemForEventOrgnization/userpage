import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';

class ApplyEventModal extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.session);
    this.state = {
      checkedList: [],
      plainOptions: this.props.plainOptions,
    };
  }

  onChange = (checkedList) => {
    const { handleCheckList } = this.props;
    handleCheckList(checkedList);
  };

  render() {
    const { plainOptions } = this.state;
    const valid = plainOptions.length > 1;
    console.log('session in banner : ', this.props.session);

    return (
      <div>
        {!valid ? (
          <h4>Confirm apply this event ?</h4>
        ) : (
          <Checkbox.Group onChange={this.onChange}>
            {plainOptions.map((ss) => (
              <Checkbox value={ss.id} key={ss.id} className="mt-3 ml-2">
                {ss.id}
              </Checkbox>
            ))}
          </Checkbox.Group>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.event.session,
});

export default connect(mapStateToProps, null)(ApplyEventModal);
