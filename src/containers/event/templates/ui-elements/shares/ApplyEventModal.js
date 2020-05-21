import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';

class ApplyEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: [],
      indeterminate: true,
      checkAll: false,
      plainOptions: this.props.session,
    };
  }

  onChange = (checkedList) => {
    const { plainOptions } = this.state;

    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };

  onCheckAllChange = (e) => {
    const { plainOptions } = this.state;
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  render() {
    const { indeterminate, checkAll, plainOptions } = this.state;
    const valid = plainOptions.length > 1;

    return (
      <div>
        {!valid ? (
          <h3>Confirm apply this event ?</h3>
        ) : (
          <div>
            <div className="site-checkbox-all-wrapper">
              <Checkbox
                indeterminate={indeterminate}
                onChange={this.onCheckAllChange}
                checked={checkAll}
              >
                Check all
              </Checkbox>
            </div>

            <br />
            {plainOptions.map((ss) => (
              <Checkbox value={ss.id} key={ss.id}>
                {ss.day.toString()}
              </Checkbox>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.event.session,
});

export default connect(mapStateToProps, null)(ApplyEventModal);
