import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import DropContainer from './templates/components/DropContainer';
import Header from '../share/_layout/Header';
import MenuBlockList from './MenuBlockList';

// import TrashDropContainer from '../event/templates/components/TrashDropContainer';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  handlePreview = () => {};

  toggleCollapsed = (value) => {
    this.setState({
      collapsed: value,
    });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <div className=" create-event">
        <div className="fixed-top ">
          <Header />
        </div>

        <div className="d-flex flex-row-reverse">
          <Button className="mr-5 ml-3" type="primary" size="large">
            Public
          </Button>

          <Button type="dashed" size="large" onClick={this.handlePreview}>
            <Link to="/create/preview">Preview</Link>
          </Button>
        </div>

        <div className="d-flex">
          <MenuBlockList toggleCollapsed={this.toggleCollapsed} />

          <div
            className={
              collapsed
                ? '  mt-1 drop-area  mb-5 move-right p-3'
                : ' mt-1 drop-area  mb-5 p-3'
            }
          >
            <DropContainer />
          </div>
        </div>

        {/* <div>
          <div className="bg-secondary float-right border border-danger rounded-circle ">
            <TrashDropContainer />
          </div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

// const mapDispatchToProps = (dispatch) => ({

// });

export default connect(mapStateToProps, null)(CreateEvent);
