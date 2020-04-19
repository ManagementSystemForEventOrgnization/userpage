import React, { Component } from 'react'
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
class Banner2 extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }



    render() {
        //     font-weight: bolder;
        // font-size: xx-large;
        // position: absolute;
        // top: 30%;
        // left: 10%;


        return (
            <div className="banner-block-2">
                <table>
                    <tr>
                        <td></td>
                        <td rowspan={2} style={{ width: '100%' }}> <Image editable={true} /></td>
                    </tr>
                    <tr>
                        <td colspan={2} style={
                            {
                                width: '100%',
                                fontSize: 'xx-large',
                                fontWeight: 'bolder',
                                alignContent: 'center',
                                zIndex: '2000'
                            }
                        }
                        >  <Text editable={true} /></td>
                    </tr>
                </table>



            </div>
        )
    }
}

export default Banner2
