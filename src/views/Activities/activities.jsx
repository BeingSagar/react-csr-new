
import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Card from "components/Card/Card";
import CustomTable from "components/Table/Table";

let activities =
        {
            header: ['Name','Title','Type','Date','Content','Transportation','Location','Attendees'],
            content: [
                {
                "name": "Asolo Theatre Trip",
                "title": "Activity May 4",
                "type": "Announcement",
                "date": "Thursday, June 6 - 3 PM",
                "content": "My Content",
                "location": "Asolo Theatre 1",
                "transportation": "Transportation is not provided",
                "Attendees": "View",
                },
                {
                    "name": "Asolo Theatre Trip 2",
                    "title": "Activity May 1",
                    "type": "Announcement",
                    "date": "Thursday, June 9 - 3 PM",
                    "content": "My Content",
                    "location": "Asolo Theatre 2",
                    "transportation": "Transportation is provided",
                    "Attendees": "View",
                }
            ]
        }
    ;

class Activities extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="ACTIVITIES"
                                ctAllIcons
                                category={
                                    <span>
                                    </span>
                                }
                                content={
                                    <Row>
                                        <CustomTable data={activities}>

                                        </CustomTable>
                                    </Row>
                                }
                            />
                        </Col>

                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Activities;
