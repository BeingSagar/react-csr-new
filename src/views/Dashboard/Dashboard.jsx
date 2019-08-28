
import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";

import WorkOrder from "../WorkOrder/work-order";
import Ambiance from "../Ambiance/ambiance";
import Activities from "../Activities/activities";
import Dining from "../Dining/dining";
import HomeApp from "../HomeApp/home-app";

class Dashboard extends Component {
  createLegend(json) {
    let legend = [];
    for (let i = 0; i < json["names"].length; i++) {
      let type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
    }
    return legend;
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="fas fa-tv text-danger" />}
                statsText="TV"
                statsValue="/view/tv"
                statsIcon={<i className="fas fa-tv" />}
                statsIconText="/view/ambiance"
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="fas fa-film text-danger" />}
                statsText="Netflix"
                statsValue="/view/netflix"
                statsIcon={<i className="fas fa-film" />}
                statsIconText=""
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="fas fa-music text-danger" />}
                statsText="Ambiance"
                statsValue="/view/ambiance"
                statsIcon={<i className="fas fa-music" />}
                statsIconText=""
              />
            </Col>
              <Col lg={4} sm={6}>
                  <StatsCard
                      bigIcon={<i className="far fa-calendar-alt text-danger" />}
                      statsText="Calendar"
                      statsValue="/view/calendar"
                      statsIcon={<i className="far fa-calendar-alt" />}
                      statsIconText=""
                  />
              </Col>
              <Col lg={4} sm={6}>
                  <StatsCard
                      bigIcon={<i className="fas fa-puzzle-piece text-danger" />}
                      statsText="Activities"
                      statsValue="/view/activities"
                      statsIcon={<i className="fas fa-puzzle-piece" />}
                      statsIconText=""
                  />
              </Col>
              <Col lg={4} sm={6}>
                  <StatsCard
                      bigIcon={<i className="fas fa-tools text-danger" />}
                      statsText="Repairs"
                      statsValue="/view/repairs"
                      statsIcon={<i className="fas fa-tools" />}
                      statsIconText=""
                  />
              </Col>
              <Col lg={4} sm={6}>
                  <StatsCard
                      bigIcon={<i className="fas fa-utensils text-danger" />}
                      statsText="Dining"
                      statsValue="/view/dining"
                      statsIcon={<i className="fas fa-utensils" />}
                      statsIconText=""
                  />
              </Col>
              <Col lg={4} sm={6}>
                  <StatsCard
                      bigIcon={<i className="fas fa-cloud-sun text-danger" />}
                      statsText="Weather"
                      statsValue="/view/weather"
                      statsIcon={<i className="fas fa-cloud-sun" />}
                      statsIconText=""
                  />
              </Col>
              <Col lg={4} sm={6}>
                  <StatsCard
                      bigIcon={<i className="fas fa-cogs text-danger" />}
                      statsText="Settings"
                      statsValue="/view/settings"
                      statsIcon={<i className="fas fa-cogs" />}
                      statsIconText=""
                  />
              </Col>

          </Row>
          <Row>
            <Col md={8}>

            </Col>
            <Col md={4}>
            </Col>
          </Row>

          <Row>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
