import React from 'react';
import { connect } from 'react-redux'
import { Pagination } from 'antd';
import { Input, Select, List, DatePicker } from 'antd';
import { eventActions } from '../../action/event.action';
import moment from 'moment';
import CartEvent from '../../components/CardEvent';


const { Search } = Input;
const { Option } = Select;

const { RangePicker } = DatePicker;


class HistoryProfile extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      selectedOption: '',
      dateStrings: " ",
      dateStrings: " ",
      categories: [],
      search: " ",
      pageNumber: '',

    }
  }
  componentDidMount = () => {
    const { getCategories, categories } = this.props;

    getCategories();
    this.setState({
      categories,
    });
  };

  handleChange = (selectedOption) => {

    this.setState({
      selectedOption,
    })
  }
  onChange = (dates, dateStrings) => {
    this.setState({
      dates,
      dateStrings
    })
  }

  onChangeSearch = (value) => {
    this.setState({
      search: value,
    })
    console.log(this.state.search);
  }

  onChange = (pageNumber) => {
    this.setState({
      pageNumber,
    })
    console.log('Page: ', pageNumber);
  }

  render() {
    const { categories, } = this.state;
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
    const src = "https://res.cloudinary.com/dwt4njhmt/image/upload/v1588052185/por9cvfqtxvzmmdrvlsw.jpg";

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
            <RangePicker className="date"
              ranges={{
                Today: [moment(), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
              }}
              format="YYYY/MM/DD HH:mm:ss"
              onChange={this.onChange}

            />

          </div >
          <div className='col '>
            <Select
              style={{ width: '100%', }}
              onChange={this.handleChange} >
              {
                categories.map((item) =>
                  <Option key={item._id} value={item._id}>{item.name}</Option>
                )}

            </Select>
          </div >
          <div className='col '>
            <Search
              className="research place mb-4"
              placeholder="input search text"
              onSearch={value => this.onChangeSearch(value)}
            />
          </div>
        </div>
        <div className="row ">
          {
            data.map((item, index) => <div key={index} className="col mt-4">
              <CartEvent eventDetail={eventCartDetail} />
            </div>)
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

})

const mapDispatchToProps = (dispatch) => ({

  getCategories: () => dispatch(eventActions.getCategories()),

});


export default connect(mapStateToProps, mapDispatchToProps)(HistoryProfile)
