
import React, { Component } from "react";
import { Table } from "react-bootstrap";

const CustomTable = ({...props})=> {
    const { data } = props;
    console.log(data);
    return (
        <div className="card card-stats">
            <div className="content">
                <Table striped bordered responsive>
                    <thead>
                        <tr>
                            {
                                data.header.map((header)=> {
                                    return <th key={header}><b>{header}</b></th>
                                })
                            }
                    </tr>
                    </thead>
                    <tbody>
                        {
                            data.content.map((value,index)=> {

                                    return <tr key={index}>
                                        {
                                            Object.keys(value).map((val,i)=> {
                                                if(Array.isArray(value[val]) ){
                                                    return <td><a href="">View {val}</a></td>
                                                }else{
                                                    return <td key={i}>{value[val]}</td>
                                                }
                                            })
                                        }
                                    </tr>


                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};


export default CustomTable;
