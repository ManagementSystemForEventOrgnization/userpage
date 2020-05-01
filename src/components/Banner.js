import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { StarFilled } from '@ant-design/icons';
class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isLogined } = this.props;
    return (
      <div className="banner">
        <h1 className="title-name">EVENT IN YOUR HAND</h1>
        <h2>Be easier to create and organize event </h2>
        {isLogined ? (
          <Link to="/prepare">
            <Button
              type="danger"
              icon={<StarFilled />}
              size="large"
              onClick={this.showModal}
            >
              Create Event Now
            </Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button type="danger" icon={<StarFilled />} size="large">
              Login To Expore Now
            </Button>
          </Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogined: state.user.isLogined,
});
export default connect(mapStateToProps, null)(Banner);
