import React from 'react';
import { connect } from 'react-redux'
import { Pagination } from 'antd';
import { Input, Select, DatePicker } from 'antd';

import moment from 'moment';
import CartEvent from '../../components/CardEvent';
import { userActions } from '../../action/user.action';

const { Search } = Input;
const { Option } = Select;

const { RangePicker } = DatePicker;


class HistoryProfile extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      categoryEventId: " ",
      startDate: " ",
      endDate: " ",
      txtSearch: ' ',
      pageNumber: "",
      numberRecord: "",
      categories: this.props.categories,
      arrEvent: [],


    }
  }





  handleChange = (categoryEventId) => {

    this.setState({
      categoryEventId,


    })
    this.handleFilter()
  }

  onChangeDates = (dates, dateStrings) => {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    this.setState({
      startDate: dateStrings[0],
      endDate: dateStrings[1],

    })
    this.handleFilter()

  }

  onChangeSearch = (value) => {

    console.log(value);
    this.setState({
      txtSearch: value,


    })
    // this.handleFilter()

  }

  onChange = (pageNumber) => {
    this.setState({
      pageNumber,

    })
    // this.handleFilter();
    // console.log('Page: ', pageNumber);
  }
  handleFilter = () => {
    const { get_History } = this.props;
    const {
      categoryEventId,
      startDate,
      endDate,
      txtSearch,
      pageNumber,
      numberRecord } = this.state;
    get_History(categoryEventId,
      startDate,
      endDate,
      txtSearch,
      pageNumber,
      numberRecord)

  }

  render() {
    const { categories, arrEvent } = this.state;
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
        title: 'Sân khấu-N ghệ thuật',
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
    const src = "https://res.cloudinary.com/dwt4njhmt/image/upload/v1588052185/por9cvfqtxvzmmdrvlsw.jpg";

    const eventCartDetail = {
      urlWeb: src,
      name: 'Nâng Cao Nghiệp Vụ Hướng Dẫn Viên Châu Âu',
      startTime: 'T2, 13 Tháng 4 2020 3:00 PM',
      address: '02 Tôn Đức Thắng Street,Bến Nghé Ward, Quận 1, Thành Phố Hồ Chí Minh'
    }

    return (
      <div className="history">

        <div className="row">

          <div className="col ">
            <RangePicker

              format="YYYY-MM-DD "
              onChange={this.onChangeDates}
              onOk={this.onOk}
            />

          </div >
          <div className='col '>
            <Select
              style={{ width: '100%', }}
              onChange={this.handleChange}
            >
              {
                categories.map((item) =>
                  <Option key={item._id} value={item._id}>{item.name}</Option>
                )}

            </Select>
          </div >
          <div className='col '>
            <Search
              placeholder="input search text"

              onSearch={(value) => this.onChangeSearch(value)}
            />
          </div>
        </div>
        <div className="row ">
          {
            arrEvent.map((item, index) =>
              <div key={index} className="col mt-4">
                <CartEvent eventDetail={eventCartDetail} />

              </div>


            )
          }


        </div>
        <div className="mt-5" style={{ textAlign: "center" }}>
          <Pagination
            onChange={this.onChange}
            defaultCurrent={1}
            total={500}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  // map state of store to props
  categories: state.event.categories,
  arrayEvent: state.user.arrEvent,

})

const mapDispatchToProps = (dispatch) => ({

  // getCategories: () => dispatch(eventActions.getCategories()),
  // getHistory: (categoryEventId, startDate, endDate, txtSearch, pageNumber, numberRecord) => dispatch(userActions.getHistory(categoryEventId, startDate, endDate, txtSearch, pageNumber, numberRecord)),
  get_History: (categoryEventId, startDate, endDate, txtSearch, pageNumber, numberRecord) => dispatch(userActions.get_History(categoryEventId, startDate, endDate, txtSearch, pageNumber, numberRecord))

});


export default connect(mapStateToProps, mapDispatchToProps)(HistoryProfile)
