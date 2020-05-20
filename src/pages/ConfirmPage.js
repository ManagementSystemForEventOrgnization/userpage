import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

class ConfirmPage extends Component {
  handleClick = () => {
    // const { dropContainerHtml } = this.props;

    const data = document.getElementById('blocks-list');
    const result = document.getElementById('result');
    result.innerHTML = data.innerHTML;
  };
  render() {
    const { blocks, match } = this.props;
    console.log(blocks);
    return (
      <div>
        <Button onClick={this.handleClick}>Confirm</Button>
        <div
          style={{
            display: 'none',
          }}
        >
          <div id="blocks-list">
            {blocks.map((item) =>
              item.options({
                key: item.id,
                id: item.id,
                editable: false,
                match,
              })
            )}
          </div>
        </div>

        <div id="result"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blocks: state.event.blocks,
  dropContainerHtml: state.event.dropContainerHtml,
});

export default connect(mapStateToProps, null)(ConfirmPage);
