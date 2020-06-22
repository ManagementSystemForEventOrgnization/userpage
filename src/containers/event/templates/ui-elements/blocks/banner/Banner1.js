import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageBlock from '../../atoms/Image';

class Banner1 extends Component {
  render() {
    const { editable } = this.props;
    return (
      <ImageBlock editable={editable} url={this.props.banner} {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  banner: state.event.banner,
});

export default connect(mapStateToProps, null)(Banner1);
