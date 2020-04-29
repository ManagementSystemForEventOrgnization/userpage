import React from 'react';
import { connect } from 'react-redux';

class PreviewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { blocks } = this.props;
    console.log(blocks);

    return (
      <div>
        {blocks.map((item) => {
          return item.options({
            key: item.id,
            editable: false,
            style: item.style,
          });
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blocks: state.event.blocks,
});

// const mapDispatchToProps = (dispatch) => ({

// });

export default connect(mapStateToProps, null)(PreviewEvent);
