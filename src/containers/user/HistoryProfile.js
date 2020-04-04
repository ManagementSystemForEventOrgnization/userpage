import React from 'react';
import { connect } from 'react-redux'
import { Input, Select, List, DatePicker } from 'antd';
import { Link } from 'react-router-dom';

import CartEvent from '../../components/CardEvent';


const { Search } = Input;
const { Option } = Select;

const { RangePicker } = DatePicker;


class HistoryProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ['Tất cả địa điểm', 'Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng'],
            name: '',
        }
    }

    onNameChange = event => {
        this.setState({
            name: event.target.value,
        });
    };

    render() {
        const { items } = this.state;
        const data = [
            {
                title: 'Tất cả ',
            },
            {
                title: 'Hội nghị',
            },
            {
                title: 'Du lịch',
            },
            {
                title: 'Sân khấu-Nghệ thuật',
            },
            {
                title: 'Tình nguyện',
            },
            {
                title: 'Workshop',
            },
            {
                title: 'Talkshow',
            },


        ];
        const src = "https://images.freeimages.com/images/large-previews/977/beach-1364350.jpg";

        const eventCartDetail = {
            coverURL: src,
            title: 'Nâng Cao Nghiệp Vụ Hướng Dẫn Viên Châu Âu',
            timeStart: 'T2, 13 Tháng 4 2020 3:00 PM',
            address: '02 Tôn Đức Thắng Street,Bến Nghé Ward, Quận 1, Thành Phố Hồ Chí Minh'
        }

        return (
            <div className="history">

                <div className="row">

                    <div className="col ">
                        <RangePicker className="date" />

                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta

                                        title={<Link to='#'> {item.title}</Link>}

                                    />
                                </List.Item>
                            )}
                        />
                        <Select className="select-place"
                            placeholder="Tất cả địa điểm"
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <br></br>
                                </div>
                            )}
                        >
                            {items.map(item => (
                                <Option key={item}>{item}</Option>
                            ))}
                        </Select>
                    </div >

                    <div className='col '>
                        <div className="movie_card">

                            <Search
                                className="largesearch place mb-4"
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                            />
                            <div className="row ">
                                {
                                    data.map(item => <div key={item} className="col mt-4">
                                        <CartEvent eventDetail={eventCartDetail} />
                                    </div>)
                                }

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    // map state of store to props

})

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(HistoryProfile)
