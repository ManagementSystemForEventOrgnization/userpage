import React from 'react';
import { connect } from 'react-redux'
import TextBlock from './templates/components/ui-elements/atoms/Text';
import ImageBlock from './templates/components/ui-elements/atoms/Image';


const textBlockOption = ({ key, content }) => <TextBlock
    key={key}
    content={content}
/>

const imageBlockOption = ({ key, url, editable }) => <ImageBlock
    key={key}
    url={url}
    editable={editable}

/>

class PreviewEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropList: [
                {
                    id: 1,
                    url: '/bg-2.jpg',
                    options: imageBlockOption
                },
                {
                    id: 2,
                    content: 'mai',
                    options: textBlockOption
                },
            ]
        }
    }

    render() {
        const { dropList } = this.state;
        return (
            <div>
                {dropList.map(item => {
                    return item.options({
                        key: item.id,
                        content: item.content ? item.content : "demo",
                        url: item.url ? item.url : "/bg-2.jpg",
                        editable: false
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
