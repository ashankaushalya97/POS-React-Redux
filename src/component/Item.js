import React, {useEffect, useState} from 'react'
import 'antd/dist/antd.css';
import '../css/style.scss'
import {Button, Col, Form, Icon, Input, Row, Table, Modal, message} from 'antd';
const { confirm } = Modal;


function Item(props) {

    const [list, setList] = useState([]);
    const [finalRecord, setDataRecord] = useState([]);
    const [disableState,setDisableState] = useState(true);
    const axios = require('axios');

    const btnStyle = {
        margin: 10
    };


    const icnStyle = {
        ":hover": {
            color: "#f70000",
            cursor:"pointer",
        },
        cursor:"pointer",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ');
                if(values.code === finalRecord.code){
                    axios.put('http://localhost:5050/api/v1/items/'+values.code, values)
                        .then(function (response) {
                            console.log(response)
                            setDisableState(true);
                            message.success( 'Item "'+values.description+'" updated successfully');
                            props.form.resetFields();
                        })
                        .catch(function (error) {
                            message.error('Unable to update item');
                            console.log(error)
                        })
                }

                axios.post('http://localhost:5050/api/v1/items/', values)
                    .then(function (response) {
                        console.log(response)
                        message.success( 'Item "'+values.description+'" saved successfully');
                        props.form.resetFields();
                    })
                    .catch(function (error) {
                        message.error('Unable to save item');
                        console.log(error)
                    })
            }
        });
    };

    const assignDataToFields = (record) =>{
        console.log(record);
        setDisableState(false);
        props.form.setFieldsValue({
            'code':record.code,
            'description':record.description,
            'qty':record.qty,
            'unitPrice':record.unitPrice
        })

    }

    // const clearFields = () =>{
    //     props.form.setFieldsValue({
    //         'code':'',
    //         'description':'',
    //         'qty':'',
    //         'unitPrice':''
    //     })
    //
    // }


    const deleteRecord = (code) => {
        console.log(code);
        console.log("delete function is working " )
        axios.delete('http://localhost:5050/api/v1/items/'+ code)
            .then(function (response) {
                console.log(response)
                setDisableState(true);
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function showDeleteConfirm() {
        confirm({
            title: 'Are you sure delete this Item?',
            content: 'Item descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                deleteRecord(finalRecord.code);
                props.form.resetFields();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    const {getFieldDecorator} = props.form;

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:5050/api/v1/items/',
            responseType: 'json'
        }).then(function (response) {
                setList(response.data);
            });
    });



    const columns = [
        {title: 'Code', dataIndex: 'code', key: 'code'},
        {title: 'Description', dataIndex: 'description', key: 'description'},
        {title: 'Qty', dataIndex: 'qty', key: 'qty'},
        {title: 'UnitPrice', dataIndex: 'unitPrice', key: 'unitPrice'},
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                <span>
                     {/*<Divider type="vertical"/>*/}
                    <Icon style={icnStyle} type="rest" theme="filled"  onClick={showDeleteConfirm} />
                </span>
            ),
        },
    ];


    return (
        <div className="col-12">


            <Row type="flex" justify="space-between">
                <Col span={12}>
                    <h2><Icon type="form"/> Manage Items</h2>
                    <Form onSubmit={handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('code', {
                                rules: [{required: true, message: 'Please input Item Code'}],
                            })(
                                <Input disabled={!disableState} id={"code"}
                                    prefix={<Icon type="code" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Item Code"

                                />,
                            )}
                        </Form.Item>
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
                        <Form.Item>
                            {getFieldDecorator('qty', {
                                rules: [{required: true, message: 'Please input Item Quantity'}],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Item Quantity"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('unitPrice', {
                                rules: [{required: true, message: 'Please input Item UnitPrice'}],
                            })(
                                <Input
                                    prefix={<Icon type="home" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Item UnitPrice"
                                />,
                            )}
                        </Form.Item>

                        <Form.Item>
                            <Row>
                                <Button id={"btnSave"} style={btnStyle} disabled={!disableState} type="primary"  htmlType="submit" className="login-form-button">
                                    Save
                                </Button>
                                <Button style={btnStyle} type="primary" htmlType="submit" className="login-form-button" >
                                    Update
                                </Button>
                                <Button id={"btnUpdate"} style={btnStyle} disabled={disableState} type="default" htmlType="reset" onClick={()=>{props.form.resetFields(); setDisableState(true);}} className="login-form-button">
                                    Clear
                                </Button>
                            </Row>
                        </Form.Item>
                    </Form>
                </Col>

                <Col span={11}>
                    <Table
                        rowKey={record => record.code}
                        onRow={(record) => ({
                            onClick: () => {
                                // deleteRecord(record.code)
                                assignDataToFields(record)
                                setDataRecord(record);
                                // setSelectedCode(record.code);
                                // setSelectedDes(record.description);
                                // setSelectedQty(record.qty);
                                // setSelectedUnitPrice(record.unitPrice);
                            }
                        })
                        }
                        dataSource={list}
                        columns={columns}/>;
                </Col>

            </Row>

        </div>
    );
}

export default Form.create({name: 'normal_login'})(Item);
