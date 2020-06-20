import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment'
import {
    Input,
    Select,
    DatePicker,
    Card,
    message,
    Skeleton,
    Collapse,
    Button,
    Menu,
    Row, Col,
    Dropdown,
    Modal,
    Radio 
} from 'antd';
import { Link } from 'react-router-dom';
import {

    EnvironmentOutlined,
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import { userActions } from 'action/user.action';
import { eventActions } from 'action/event.action';
const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const { confirm } = Modal;
const { SubMenu } = Menu;

//  { "email":"ptmaimai106@gmail.com",
//    "password":"123456"

//  }

const { RangePicker } = DatePicker;
class CreateHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            numberRecord: 10,
            categories: this.props.categories,
            listEvent:[...this.props.arrEvent],

            collapsed: false,
            confirmLoading: false,
            eventId:'',
            typeofEvent:"",
            statusEvent:'All',
            pageNumber:0,
            hasMore: true,
            isfirstLoad:true,

          


        };
    }
    componentDidMount = () => {
        const { getCreateHistory, getCategories, match } = this.props;

        console.log('te1', match);
        getCreateHistory();
        getCategories();
         

    };
    handleChange = (categoryEventId) => {
        const { getCreateHistory } = this.props;
        let dataSent = {};

        dataSent.categoryEventId = categoryEventId;

        getCreateHistory(
            dataSent
        );

    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }


    onChangeDates = (dates) => {
        const { getCreateHistory } = this.props;

        let dataSent = {};
        dataSent.startDate = dates[0]._d;
        dataSent.endDate = dates[1]._d;


        getCreateHistory(
            dataSent
        );


    };
    ableToLoadMore = (count) => {
        if (count === 0) return false;
    
        if (count === 10) return true;
        return count % 10 === 0;
      };
    onLoadMore=()=>{
        const { getCreateHistory,arrEvent } = this.props;
        const{listEvent}=this.state;

          let index=Math.round(listEvent.length / 10) + 1
      let dataSent={};
      dataSent.pageNumber=index;
       getCreateHistory(dataSent);
   let  Event=[...listEvent, ...arrEvent]
     console.log('tes1110',Event);
     this.setState({listEvent:Event});
     

    }

    onChangeSearch = (value) => {
        const { getCreateHistory, match } = this.props;
        this.setState({
            txtSearch: value,
        });
        let dataSent = {};
        dataSent.txtSearch = value;

        getCreateHistory(
            dataSent
        );

    };

    onChange = (pageNumber) => {
        this.setState({
            pageNumber,
        });

    };
    loadEvent = () => {
        const { pageNumber } = this.state;
        let number = +pageNumber + 1;
        this.setState({
            pageNumber: number,
        })




        setTimeout(this.handleFilter(), 3000);
    };


    sumDiscount = (ticket, discount) => {
        let newDiscount = 1 - discount;

        let sum = newDiscount * ticket;
        let money = `${sum} VNĐ `;

        return money;
    };
    percentDiscount = (discount) => {
        let newDiscount = discount * 100;

        let percent = `-${newDiscount}%`;

        return percent;
    };
    onChangeStatus = (value) => {
        const { getCreateHistory } = this.props;
       this.setState({
        statusEvent:value
       })
     
        let dataSent = {};
        if(value==='ALL' ){
            getCreateHistory();
        }
        else{
                dataSent.status = value;
                getCreateHistory(
                    dataSent
                );
         
      
        }

    }

    handleDeleteEvent = eventId => { };
    handleEditSite = (url, eventId) => {
        localStorage.setItem('webAddress', url);
        localStorage.setItem('currentId', eventId);
    }
    handleURL = (url) => {
        localStorage.setItem('webAddress', url);
    }

    showDeleteConfirm = () => {
        const { deleteEvent ,arrEvent } = this.props;
        const { eventId} = this.state;
        this.setState({
           
            confirmLoading: true,
          });
        deleteEvent(eventId);

        let receiver = arrEvent.filter((e) => e._id !== eventId && (s => s.status === 'DELETE'));
        console.log("aha", receiver);
       
            this.setState({
              isfirstLoad: false,
              listEvent:receiver
            })
       

    }
    isShowDelete = (eventId) => {
    
        this.setState({
            visible: true,
            eventId: eventId

        })
    }
    isCancel = () => {
        this.setState({ visible: false })
    }
    onChaneValue=(e)=>{
        const {getCreateHistory}=this.props;
        const{statusEvent}=this.state;
        this.setState({
            typeofEvent:e.target.value
        })
        console.log('1',statusEvent);
        console.log('2',e.target.value)
       if(statusEvent==='All' ){
              getCreateHistory();
       }
       else{
         
          
           let dataSent={};
           dataSent.status=statusEvent;
           dataSent.typeOfEvent=e.target.value;
           getCreateHistory(dataSent);
          
       }
    }

    renderMenu = item => {
        const text = 'Are you sure to delete this task?';
        const menu = (
            <Menu key={`menu${item._id}`} >
                
                <Menu.Item onClick={() => this.handleEditSite(item.urlWeb, item._id)}>
                    <Link to='/create'>Edit site</Link>
                </Menu.Item>

                <Menu.Item onClick={()=>this.isShowDelete(item._id)}>
                
                        Delete event
                
                     
                </Menu.Item>

            <Menu.Item onClick={() => this.handleURL(item.urlWeb)}>
                <Link to={`/manage/${item._id}`}>
                    Manage event
                    </Link>
            </Menu.Item>
            <Menu.Item onClick={()=>this.isShowDelete(item._id)}>
                
                Cancel event
        
             
        </Menu.Item>
            </Menu >
        );

        return menu;
    }

    render() {

        const { categories ,} = this.state;
        const { pending,arrEvent,pend,errMessage} = this.props;
        let { listEvent } = this.state;
        listEvent = listEvent.length > 0 ? listEvent : [...arrEvent];
    

        return (
            <div className="history">
                <div style={{height:'50px',
                 width:'100%',opacity:'1',color:"black",
                 textAlign:'center' , fontSize:'30px',
                 fontWeight:'700'}}>Manage Event</div>
                <Row className="mt-5">
                    <Col span={18} push={6}>

                        <div>
                            <div className="row">
                                {/* <div className="col ">
                                    <RangePicker
                                        format="YYYY-MM-DD "
                                        onChange={this.onChangeDates}
                                        onOk={this.onOk}
                                        style={{height:'45px'}}
                                    />
                                </div> */}
                                {/* <div className="col ">
                                    <Select style={{ width: '100%',height:'45px' }} onChange={this.handleChange}
                                    >
                                        {categories.map((item) => (
                                            <Option key={item._id} value={item._id}>
                                                {item.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </div> */}
                                <div className="col ">
                                    <Search
                                        enterButton
                                        size="large"
                                        // value={this.state.txtSearch}
                                        placeholder="input search text"
                                        // onChange={this.handleChangeSearch}
                                        onSearch={(value) => this.onChangeSearch(value)}

                                    />
                                </div>
                            </div>
                            <div className="mt-5" style={{color:'white'}}>
                            <Radio.Group name="radiogroup"  style={{color:'white'}}
                            defaultValue="Public" onChange={this.onChaneValue}>
                            <Radio  style={{color:'black' , fontWeight:400, fontSize:'18px'}} value="Private">Private</Radio>
                            <Radio  style={{color:'black' ,fontWeight:400, fontSize:'18px'}} value='Public'>Public</Radio>
                        
                          </Radio.Group>
                          </div>
                            {pending ? (

                                <Skeleton className="mt-2" avatar paragraph={{ rows: 4 }} active />
                            ) : (
                                    <div className="row p-5 ">
                                    {listEvent.map((item) => (
                                        <div className="col-xl-12 col-lg-12 col-md-12 mt-12 mt-5" key={item._id}>

                                            <Card
                                                className="event-cart "
                                                cover={
                                                    <div>
                                                        <Dropdown overlay={this.renderMenu(item)} placement="bottomLeft">
                                                            <Button className="ml-1 mt-1 ticket">
                                                                Action
                                                                </Button>
                                                        </Dropdown>


                                                        {item.bannerUrl && (
                                                            <img
                                                                className="img-baner"
                                                                alt="example"
                                                                src={item.bannerUrl}
                                                            />
                                                        )}
                                                    </div>
                                                }
                                            >
                                                <div className="row">
                                                    <div className="d-flex col ">
                                                        <p
                                                            className="ml-2"
                                                            style={{
                                                                fontWeight: 'bold',
                                                                textTransform: 'uppercase',
                                                            }}
                                                        >
                                                            {moment(item.session && item.session[0] && item.session[0].day || new Date().toLocaleDateString()).format('DD/MM/YYYY ')}
                                                        </p>
                                                    </div>
                                                    <div className="d-flex col ">
                                                        <div>
                                                            {item.ticket ? (
                                                                <div className="d-flex ">
                                                                    {item.ticket.discount ? (
                                                                        <div className="d-flex ">
                                                                            <p
                                                                                style={{
                                                                                    textDecoration: 'line-through',
                                                                                    fontWeight: 'bold',
                                                                                }}
                                                                                className="ml-1 "
                                                                            >
                                                                                {item.ticket.price}
                                                                            </p>
                                                                            <p
                                                                                className="ml-3"
                                                                                style={{ fontWeight: 'bold' }}
                                                                            >
                                                                                {' '}
                                                                                {this.sumDiscount(
                                                                                    item.ticket.price,
                                                                                    item.ticket.discount
                                                                                )}
                                                                            </p>
                                                                            <div className="col">
                                                                                <h4>{item.status}</h4>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                            <p
                                                                                className=" mt-1 "
                                                                                style={{ fontWeight: 'bold' }}
                                                                            >
                                                                                {item.ticket.price} VNĐ
                                                                            </p>
                                                                        )}
                                                                </div>
                                                            ) : (
                                                                    <p style={{ fontWeight: 'bold' }} className="ml-1  ">
                                                                        0 VNĐ
                                                                    </p>
                                                                )}
                                                        </div>

                                                    </div>

                                                </div>
                                                <div className="d-flex ">
                                                    <h5 className="ml-2 line-clamp " style={{
                                                        fontWeight: 'bold',
                                                        textTransform: 'uppercase',
                                                    }}> {item.name}</h5>
                                                    <div>
                                                        {' '}
                                                        {(item.session && item.session.length || 1) === 1 ? (
                                                            ''
                                                        ) : (
                                                                <p className="ml-2" style={{ fontWeight: 'bold' }}>
                                                                    + {item.session.length - 1}more events
                                                                </p>
                                                            )}
                                                    </div>
                                                </div>

                                                <div className="d-flex ">
                                                    <EnvironmentOutlined className="mt-1" />
                                                    <div className="d-flex ">
                                                        <p className="ml-2 address ">
                                                            {item.session && item.session[0] && item.session[0].address.location}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Card>

                                        </div>
                                    ))}
                                    </div>
                                  
                             )}
                             { this.ableToLoadMore(arrEvent.length)&&
                          <Button style={{marginLeft:'45%', marginRight:'45%'}} loading={pending} type='danger' shape="round" onClick={this.onLoadMore}>Load More</Button>
                             }
                        </div>

                    </Col>


                    <Col span={4} pull={18}>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            style={{ color: 'white', fontWeight: 'bolder', fontSize:'30px',background:'rgb(246, 72, 75)' }}
                            ><Menu.Item key="1" onClick={() => this.onChangeStatus('ALL')}>
                               ALL
                    </Menu.Item>
                        <Menu.Item key="2" onClick={() => this.onChangeStatus('DRAFT')}>
                                Draft
                        </Menu.Item>
                            <Menu.Item key="3" onClick={() => this.onChangeStatus('WAITING')} >
                                Waiting
                        </Menu.Item>
                            <Menu.Item key="4" onClick={() => this.onChangeStatus('PUBLIC')} >
                                Public
                       </Menu.Item>
                            <Menu.Item key="5" onClick={() => this.onChangeStatus('EDITED')}>
                                Edited
                       </Menu.Item>
                      
                            <Menu.Item key="4" onClick={() => this.onChangeStatus('CANCEL')}>
                               Cancel
                       </Menu.Item>
                        </Menu>


                    </Col>
                </Row>,
                <Modal
                    title='Are you sure delete this task?'
                    visible={this.state.visible}
                    okText="yes"
                    okType='danger'
                    cancelText='No'
                    onOk={this.showDeleteConfirm}
                    onCancel={this.isCancel}
                    confirmLoading={pend}
                >
                    {
                    !this.state.isfirstLoad&& errMessage&&
                    <h6 style={{color:'red'}}>{errMessage}</h6>
                    
                    }
                 
                
                  

                </Modal>
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    // map state of store to props
    categories: state.event.categories,
    arrEvent: state.user.arrEvent,
    pending: state.user.pending,
    pend:state.event.pending,
    errMessage: state.event.errMessage,
});

const mapDispatchToProps = (dispatch) => ({
    get_History: (
        dataSent
    ) =>
        dispatch(
            userActions.get_History(
                dataSent
            )
        ),
    getCreateHistory: (
        dataSent

    ) =>
        dispatch(
            userActions.getCreateHistory(
                dataSent

            )
        ),
    getCategories: () => dispatch(eventActions.getCategories()),
    deleteEvent:(eventId)=>dispatch(eventActions.deleteEvent(eventId)),
    cancelEvent:(dataSent)=>dispatch(eventActions.cancelEvent(dataSent))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateHistory);
