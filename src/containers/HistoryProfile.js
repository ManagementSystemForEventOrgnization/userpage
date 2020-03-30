import React from 'react';
import { connect } from 'react-redux'
import { Menu, Dropdown, Button, message, Tooltip,Input, AutoComplete,Select,
     Divider ,Card, Avatar, List, DatePicker } from 'antd';
import { DownOutlined, UserOutlined ,FieldTimeOutlined,
    PlusOutlined, EditOutlined, EllipsisOutlined, SettingOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Search } = Input;

const { Option } = Select;
const { Meta } = Card;
const { RangePicker } = DatePicker;
let index = 0;
class HistoryProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          items: ['Tất cả địa điểm','Hồ Chí Minh', 'Hà Nội','Đà Nẵng'],
    name: '',
        }
    }
    
    onNameChange = event => {
      this.setState({
        name: event.target.value,
      });
    };
     

    render(){
      const { items, name } = this.state;
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
       const src= "https://images.freeimages.com/images/large-previews/977/beach-1364350.jpg";
        return(
           <div className="history">
              
           <div className="row">
              
               <div className="col ">
               <RangePicker   style={{ width: 205 ,fontWeight:'bold'}} />
      
               <List
            itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
     
          title={ <Link to ='#'> {item.title}</Link>}
          
        />
      </List.Item>
                 )}
               />
         <Select
        style={{ width: 205 ,fontWeight:'bold'}}
        placeholder="Tất cả địa điểm"
        dropdownRender={menu => (
          <div>
            {menu}
            
          </div>
        )}
      >
        {items.map(item => (
          <Option key={item}>{item}</Option>
        ))}
      </Select>
               </div >
        
           <div className=' col '>
             <div className="movie_card">
           
           <Search
              className="largesearch"
                 placeholder="input search text"
                 onSearch={value => console.log(value)}
          />
        <div className="row mt-5">
       <div className="col">
       <Card
      className="card-name"
    cover={
      <img  className="img"
        alt="example"
        src={src}
      />
    }
  >
    <b > Nâng Cao Nghiệp Vụ Hướng Dẫn Viên Châu Âu</b>
    <p ><FieldTimeOutlined /> T2, 13 Tháng 4 2020 3:00 PM</p>
    <p >  02 Tôn Đức Thắng Street,
       Bến Nghé Ward, Quận 1, Thành Phố Hồ Chí Minh</p>
  </Card>
  </div>
  <div className="col">
       <Card
      className="card-name"
    cover={
      <img  className="img"
        alt="example"
        src={src}
      />
    }
  >
    <b > Nâng Cao Nghiệp Vụ Hướng Dẫn Viên Châu Âu</b>
    <p ><FieldTimeOutlined /> T2, 13 Tháng 4 2020 3:00 PM</p>
    <p >  02 Tôn Đức Thắng Street,
       Bến Nghé Ward, Quận 1, Thành Phố Hồ Chí Minh</p>
  </Card>
  </div>
  <div className="col">
       <Card
      className="card-name"
    cover={
      <img  className="img"
        alt="example"
        src={src}
      />
    }
  >
    <b > Nâng Cao Nghiệp Vụ Hướng Dẫn Viên Châu Âu</b>
    <p ><FieldTimeOutlined /> T2, 13 Tháng 4 2020 3:00 PM</p>
    <p >  02 Tôn Đức Thắng Street,
       Bến Nghé Ward, Quận 1, Thành Phố Hồ Chí Minh</p>
  </Card>
  </div>
  
 
 
 
 
 
 
 
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
  