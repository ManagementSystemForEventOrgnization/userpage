import React, { Component } from 'react'

import { Steps } from 'antd';

const { Step } = Steps;

class StepBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const { key } = this.props
        return (
            <Steps size="small" current={1} key={key}>
                <Step title="Finished" />
                <Step title="In Progress" />
                <Step title="Waiting" />
            </Steps>
        )
    }
}

export default StepBlock;
