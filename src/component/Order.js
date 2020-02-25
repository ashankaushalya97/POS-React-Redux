import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Icon, Input, Row, Table, AutoComplete, Select, Divider} from "antd";
// const { Option } = Select;


function Order(props) {
    const [list, setList] = useState([]);
    const axios = require('axios');

    const btnStyle = {
        margin: 10
    };
    const columns = [
        {title: 'Code', dataIndex: 'code', key: 'code'},
        {title: 'Description', dataIndex: 'description', key: 'description'},
        {title: 'Qty', dataIndex: 'qty', key: 'qty'},
        {title: 'UnitPrice', dataIndex: 'unitPrice', key: 'unitPrice'},

    ];
    const {getFieldDecorator} = props.form;

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

            }
        });
    };
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:5050/api/v1/customers/',
            responseType: 'json'
        }).then(function (response) {
            if(list == 0){
                setList(response.data)
            }
        });
    });

    const onChange = (value) => {
        console.log(`selected ${value}`);
    }
    //
    // const onBlur = () =>{
    //     console.log('blur');
    // }
    //
    // const onFocus = () => {
    //     console.log('focus');
    // }
    //
    const onSearch = (val) => {
        // console.log('search:', val);
        list.id = val
    }

    return (
        <div>
            <div className="col-12">
                <Row type="flex" justify="space-between">
                    <Col span={12}>
                        <h2><Icon type="form"/> Manage Orders</h2>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span={12}>
                        <Form.Item>
                            {getFieldDecorator('id', {
                                rules: [{required: true, message: 'Please input Item Code'}],
                            })(

                                // <AutoComplete
                                //     dataSource={props.list}
                                //     onSearch={onSearch}
                                //     onChange={onChange}
                                //     prefix={<Icon type="code" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                //     placeholder="Customer ID"
                                //
                                // />,
                                <Input
                                    prefix={<Icon type="code" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Customer ID"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('address', {
                                rules: [{required: true, message: 'Please input Item Description'}],
                            })(
                                <Input
                                    prefix={<Icon type="code" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Customer Address"
                                />,
                            )}
                        </Form.Item>
                    </Col>
                        <Col span={11}>
                            <Form.Item>
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: 'Please input Item Description'}],
                                })(
                                    <Input
                                        prefix={<Icon type="code" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="Customer Name"
                                    />,
                                )}
                            </Form.Item>
                        </Col>
                </Row>
                <Divider className="divider-margin"/>
                <Row type="flex" justify="space-between">
                    <Col span={12}>
                        <Form.Item>
                            {getFieldDecorator('code', {
                                rules: [{required: true, message: 'Please input Item Code'}],
                            })(

                                // <AutoComplete
                                //     dataSource={props.list}
                                //     onSearch={onSearch}
                                //     onChange={onChange}
                                //     prefix={<Icon type="code" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                //     placeholder="Customer ID"
                                //
                                // />,
                                <Input
                                    prefix={<Icon type="code" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Item Code"
                                />,
                            )}
                        </Form.Item>
                        <Row type="flex" justify="space-between">
                            <Col span={11}>
                                <Form.Item>
                                    {getFieldDecorator('qtyOnHand', {
                                        rules: [{required: true, message: 'Please input Item Description'}],
                                    })(
                                        <Input
                                            prefix={<Icon type="code" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            placeholder="Quantity on Hand"
                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={11}>
                                <Form.Item>
                                    {getFieldDecorator('qty', {
                                        rules: [{required: true, message: 'Please input Item Description'}],
                                    })(
                                        <Input
                                            prefix={<Icon type="code" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            placeholder="Quantity"
                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={11}>
                        <Form.Item>
                            {getFieldDecorator('description', {
                                rules: [{required: true, message: 'Please input Item Description'}],
                            })(
                                <Input
                                    prefix={<Icon type="code" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Item Description"
                                />,
                            )}
                        </Form.Item>
                        <Button type="primary"  htmlType="submit" className="login-form-button">
                            Add
                        </Button>
                        <Button style={btnStyle} type="default" htmlType="submit" className="login-form-button">
                            Clear
                        </Button>
                    </Col>
                </Row>
                <Divider className="divider-margin"/>
                <Row type="flex" justify="space-between">
                    <Col span={20}>
                        <Table
                            rowKey={record => record.id}
                            // onRow={(record) => ({
                            //     onClick: () => {
                            //         // deleteRecord(record.code)
                            //         // assignDataToFields(record)
                            //         // setDataRecord(record);
                            //         // setSelectedCode(record.code);
                            //         // setSelectedDes(record.description);
                            //         // setSelectedQty(record.qty);
                            //         // setSelectedUnitPrice(record.unitPrice);
                            //     }
                            // })
                            // }
                            dataSource={list}
                            columns={columns}/>;
                    </Col>
                    <Col span={3}>
                        <Row>
                            <div  className="total-label">
                                <label>0.00</label>
                            </div>
                            <div className="place-order-button">
                                <Button type="primary"  htmlType="submit" className="login-form-button">
                                    Place Order
                                </Button>
                            </div>


                        </Row>
                    </Col>
                </Row>

            </div>
        </div>
    )
}
export default Form.create({name: 'normal_login'})(Order);
