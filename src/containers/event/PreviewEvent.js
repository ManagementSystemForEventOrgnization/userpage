import React from 'react';
import { connect } from 'react-redux'

class PreviewEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { blocks } = this.props;
        return (
            <div>
                {blocks.map(item => {
                    return item.options({
                        key: item.id,
                        style: item.style ? item.style : {},
                        content: item.content ? item.content : "",
                        url: item.url ? item.url : "",
                    })


                })}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    blocks: state.event.blocks,
})

// const mapDispatchToProps = (dispatch) => ({

// });


export default connect(mapStateToProps, null)(PreviewEvent)
