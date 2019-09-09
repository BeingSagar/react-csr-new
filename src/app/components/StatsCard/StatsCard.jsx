
import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

export class StatsCard extends Component {
  render() {
    return (
      <div className="card card-stats">
        <div className="content">
          <Row>
            <Col xs={12}>
                <a href={this.props.statsValue}>
              <div className="icon-big text-center icon-warning">
                {this.props.bigIcon}
              </div>
                </a>
            </Col>
            <Col xs={12}>

              <div className="numbers">
                <p>{this.props.statsText}</p>
              </div>
            </Col>
          </Row>
          <div className="footer">
            <hr />
            <div className="stats">
                {this.props.statsIcon}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatsCard;
