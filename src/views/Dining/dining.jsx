
import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Card from "components/Card/Card";
import CustomTable from "components/Table/Table";

let dining= {
    header:['mealId','dateStart','dateEnd','type','name','description','imageUrl','rating','tags','suggestions'],
    content:[
        {
            "mealId": "1",
            "dateStart": "2019-07-11 08:00:00",
            "dateEnd": "2019-07-11 12:00:00",
            "type": "1",
            "name": "Farmer's Brealfast",
            "description": "Scrambled eggs with bacon, cheese and onions soaked in bread",
            "imageUrl": "https://i.ibb.co/bgwdpYn/Farmers-Breakfast.png",
            "rating": 9,
            "tags": ["MAIN DISH", "100% BEEF"],
            "suggestions": [
                {
                    "name": "Fries",
                    "imageUrl": "https://i.ibb.co/XyNGH08/Fries.png"
                }
            ],
        },
        {
            "mealId": "2",
            "dateStart": "2019-07-11 08:00:00",
            "dateEnd": "2019-07-11 12:00:00",
            "type": "1",
            "name": "Bacon Strips",
            "description": "Fresh and crispy hickory-smocked bacon",
            "imageUrl": "https://i.ibb.co/16rGnGq/Bacon-Strips.png",
            "rating": 7,
            "tags": ["MAIN DISH", "100% BEEF"],
            "suggestions": [
                {
                    "name": "Fries",
                    "imageUrl": "https://i.ibb.co/XyNGH08/Fries.png"
                }
            ],
        },
        {
            "mealId": "3",
            "dateStart": "2019-07-11 08:00:00",
            "dateEnd": "2019-07-11 18:00:00",
            "type": "1",
            "name": "Berry Bliss",
            "description": "Fresh assorted berries from out local Glendales Farms",
            "imageUrl": "https://i.ibb.co/82SNKRm/Berry-Bliss.png",
            "rating": 10,
            "tags": ["MAIN DISH", "100% BEEF"],
            "suggestions": [
                {
                    "name": "Fries",
                    "imageUrl": "https://i.ibb.co/XyNGH08/Fries.png"
                }
            ],

        },
        {
            "mealId": "4",
            "dateStart": "2019-07-11 08:00:00",
            "dateEnd": "2019-07-11 18:00:00",
            "type": "1",
            "name": "Orange Juice",
            "description": "Florida's Natural orange juice",
            "imageUrl": "https://i.ibb.co/fMw4q3D/Orange-Juice.png",
            "rating": 9,
            "tags": ["MAIN DISH", "100% BEEF"],
            "suggestions": [
                {
                    "name": "Fries",
                    "imageUrl": "https://i.ibb.co/XyNGH08/Fries.png"
                }
            ],
        },
        {
            "mealId": "5",
            "dateStart": "2019-07-11 11:00:00",
            "dateEnd": "2019-07-11 17:00:00",
            "type": "2",
            "name": "Curried Chicken Salad",
            "description": "Chicken marinated in curry sauce with fresh crisp lettuce and grapes sprinkled with green onions",
            "imageUrl": "https://i.ibb.co/j8QP8tK/Curried-Chicken-Salad.png",
            "rating": 0,
            "tags": ["MAIN DISH", "100% BEEF"],
            "suggestions": [
                {
                    "name": "Fries",
                    "imageUrl": "https://i.ibb.co/XyNGH08/Fries.png"
                }
            ],

        },
        {
            "mealId": "6",
            "dateStart": "2019-07-11 11:00:00",
            "dateEnd": "2019-07-11 17:00:00",
            "type": "2",
            "name": "Bacon Cheeseburger",
            "description": "Our classic 100% angus beef patty grilled and topped to order",
            "imageUrl": "https://i.ibb.co/cLqm2Vy/Bacon-Cheeseburger.png",
            "rating": 7,
            "tags": ["MAIN DISH", "100% BEEF"],
            "suggestions": [
                {
                    "name": "Fries",
                    "imageUrl": "https://i.ibb.co/XyNGH08/Fries.png"
                }
            ],
        },
        {
            "mealId": "7",
            "dateStart": "2019-07-11 11:00:00",
            "dateEnd": "2019-07-11 17:00:00",
            "type": "2",
            "name": "Tossed Sliced Tomatoes",
            "description": "Fresh tomatoes sliced and dressed with olive oil, garlic, salt and pepper",
            "imageUrl": "https://i.ibb.co/jf1c6Rv/Tossed-Sliced-Tomatoes.png",
            "rating": 9,
            "tags": ["MAIN DISH", "100% BEEF"],
            "suggestions": [
                {
                    "name": "Fries",
                    "imageUrl": "https://i.ibb.co/XyNGH08/Fries.png"
                }
            ],

        },
        {
            "mealId": "8",
            "dateStart": "2019-07-11 11:00:00",
            "dateEnd": "2019-07-11 17:00:00",
            "type": "2",
            "name": "Low-Fat Milk",
            "description": "Our local daking Dairy Low-Fat Milk",
            "imageUrl": "https://i.ibb.co/vdtQcXH/Milk.png",
            "rating": 8,
            "tags": ["MAIN DISH", "100% BEEF"],
            "suggestions": [
                {
                    "name": "Fries",
                    "imageUrl": "https://i.ibb.co/XyNGH08/Fries.png"
                }
            ],
        },
        {
            "mealId": "9",
            "dateStart": "2019-07-12 08:00:00",
            "dateEnd": "2019-07-12 12:00:00",
            "type": "1",
            "name": "Waffles with Fruit",
            "description": "Golden Belgian waffles topped with fruit of your choise and whipeed cream",
            "imageUrl": "https://i.ibb.co/jDtKcPf/Waffles-with-fruit.png",
            "rating": 10,
            "tags": ["MAIN DISH", "100% BEEF"],
            "suggestions": [
                {
                    "name": "Fries",
                    "imageUrl": "https://i.ibb.co/XyNGH08/Fries.png"
                }
            ],
        },

    ]
};




class Support extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="DINING"
                                ctAllIcons
                                category={
                                    <span>
                                    </span>
                                }
                                content={
                                    <Row>
                                        <Col md={12} >
                                            <CustomTable data={dining}>

                                            </CustomTable>
                                        </Col>
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

export default Support;
