import React from 'react';
import { connect } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';

import { eventActions } from '../../../../action/event.action';

class DropContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropList: [...this.props.blocks],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.blocks !== prevState.dropList) {
      return { dropList: nextProps.blocks };
    } else return null;
  }

  handleSetDropList = (dropList) => {
    const { storeBlocksWhenCreateEvent } = this.props;
    this.setState({ dropList });
    storeBlocksWhenCreateEvent(dropList);
  };

  demo = (dropContainerHtml) => {
    if (dropContainerHtml) {
      const result = document.getElementsByClassName('drop-container')[0];
      console.log(result.innerHTML);
      console.log(dropContainerHtml);
      result.innerHTML = dropContainerHtml;
    } else {
      const result = document.getElementsByClassName('drop-container')[0];
      console.log(result);
    }
  };

  render() {
    const { dropList } = this.state;
    const { match, editable, dropContainerHtml } = this.props;
    console.log(dropContainerHtml && true);
    return (
      <div className="drop-container">
        {dropContainerHtml ? (
          <div
            dangerouslySetInnerHTML={{
              __html: dropContainerHtml,
            }}
          ></div>
        ) : (
          <ReactSortable
            id="drop-container"
            sort={true}
            group={{
              name: 'shared',
              pull: true,
              put: true,
            }}
            animation={300}
            delayOnTouchStart={true}
            delay={3}
            list={dropList}
            setList={this.handleSetDropList}
          >
            {dropList.map((item) => {
              let result = item.options({
                key: item.id,
                id: item.id,
                editable: editable,
                match: match,
              });
              return result;
            })}
          </ReactSortable>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blocks: state.event.blocks,
  dropContainerHtml: state.event.dropContainerHtml,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropContainer);
