import React, { Component } from 'react';
import { connect } from "react-redux";
import styles from './monitor.module.css';

import * as service from '../../service'
import { getMonitorData } from "../../actions/index";
import store from "../../store";

class MonitorPage extends Component {
  constructor(props) {
    super(props);
    this.state = { monitor: null }
  }

  async componentDidMount() {
    let { data } = await service.get('/monitor')
    this.setState({ monitor: data })
    this.props.getMonitorData(data)
  }


  render() {
    let monitor = this.state.monitor;
    if (!monitor) return (<div>loading...</div>)
    return (
      <div className={styles.section}>
        <div>Memoria total: {monitor.total_men / 1024}</div>
        <div>Memoria livre: {monitor.free_men / 1024}</div>
        <div>
          <h2>Cluster: {monitor.nodes.clusterName}</h2>
          <p>Max memoria: {monitor.nodes.memoryQuota}</p>
          <div>
            {
              monitor.nodes.nodes.map((node, index) => {
                return (
                  <div>
                    <div>Node: {index}</div>
                    <div>Status: {node.status}</div>
                    <div>Memoria livre: {node.memoryFree / 1024}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { monitor: state.monitor };
};

const mapDispatchToProps = dispatch => {
  return { getMonitorData: data => dispatch(getMonitorData(data)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonitorPage);
