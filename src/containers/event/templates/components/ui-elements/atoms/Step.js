import React, { Component } from 'react'

import { Steps } from 'antd';

const { Step } = Steps;


class StepBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            steps: [

                {
                    id: 1,
                    title: "Finished",
                    description: "This is a description",

                },
                {
                    id: 2,
                    title: "Waiting",
                    description: "This is a description.",

                }
            ]

        }
    }

    render() {
        const { key } = this.props;
        const { steps } = this.state;

        return (
            <div className="child-block">
                <Steps size="small" current={1} key={key} style={{ width: 300 }}>
                    {
                        steps.map(step =>
                            <Step key={step.id} title={step.title} description={step.description} />

                        )}
                </Steps>
            </div>

        )
    }
}

export default StepBlock;
