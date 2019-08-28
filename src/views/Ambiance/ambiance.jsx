
import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Card from "components/Card/Card";
import CustomTable from "components/Table/Table";

let ambiance = {
    header: ['name','iconUrl','iconResourceName','songs'],
    content: [
        {
        "name": "Sleep",
        "iconUrl": "https://i.ibb.co/C0cTQrv/moon.png",
        "iconResourceName": "",
        "songs": [
            {
                "ambianceId": "1",
                "name": "Sea Waves: Sound Sleep",
                "coverUrl": "https://i.ibb.co/MGrXGPv/sea-waves-sound-sleep.png",
                "backgroundUrl": "https://i.ibb.co/tCBM5rx/sea-waves-sound-sleep-background.png",
                "sourceUrl": "http://engage360.somee.com/sea_waves_sound_sleep.mp3"
            },
            {
                "ambianceId": "2",
                "name": "Pink Noise",
                "coverUrl": "https://i.ibb.co/ChsvMJ7/pink-noice.png",
                "backgroundUrl": "https://i.ibb.co/KVtRwR3/pink-noise-background.jpg",
                "sourceUrl": "http://engage360.somee.com/pink_noise.mp3"
            },
            {
                "ambianceId": "3",
                "name": "Clam of Space",
                "coverUrl": "https://i.ibb.co/NLqB7zH/calm-of-space.png",
                "backgroundUrl": "https://i.ibb.co/1RPYP7V/calm-of-space-background.jpg",
                "sourceUrl": "http://engage360.somee.com/calm_of_space.mp3"
            }
        ]
    },
        {
            "name": "Sleep",
            "iconUrl": "https://i.ibb.co/C0cTQrv/moon.png",
            "iconResourceName": "",
            "songs": [
                {
                    "ambianceId": "1",
                    "name": "Sea Waves: Sound Sleep",
                    "coverUrl": "https://i.ibb.co/MGrXGPv/sea-waves-sound-sleep.png",
                    "backgroundUrl": "https://i.ibb.co/tCBM5rx/sea-waves-sound-sleep-background.png",
                    "sourceUrl": "http://engage360.somee.com/sea_waves_sound_sleep.mp3"
                },
                {
                    "ambianceId": "2",
                    "name": "Pink Noise",
                    "coverUrl": "https://i.ibb.co/ChsvMJ7/pink-noice.png",
                    "backgroundUrl": "https://i.ibb.co/KVtRwR3/pink-noise-background.jpg",
                    "sourceUrl": "http://engage360.somee.com/pink_noise.mp3"
                },
                {
                    "ambianceId": "3",
                    "name": "Clam of Space",
                    "coverUrl": "https://i.ibb.co/NLqB7zH/calm-of-space.png",
                    "backgroundUrl": "https://i.ibb.co/1RPYP7V/calm-of-space-background.jpg",
                    "sourceUrl": "http://engage360.somee.com/calm_of_space.mp3"
                }
            ]
        }
    ],

};

class Ambiance extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="AMBIANCE"
                                ctAllIcons
                                category={
                                    <span>
                                    </span>
                                }
                                content={
                                    <Row>
                                        <CustomTable data={ambiance}>

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

export default Ambiance;
