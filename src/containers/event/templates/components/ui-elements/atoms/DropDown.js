import React, { Component } from 'react'
import { v4 as uuid } from "uuid";


class DropDownBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const { key, options } = this.props;
        const constructOptions = options =>
            options.map(data => (
                <option key={uuid()} value={data.id}>
                    {data.name}
                </option>
            ));

        return (
            <div className="sortable-element child-block">
                <select key={key} id={"dropdown" + uuid()}>
                    {constructOptions(options)}
                </select>
            </div>
        )
    }
}

export default DropDownBlock
