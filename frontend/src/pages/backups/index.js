import React, { Component } from 'react';
import styles from './backups.module.css';

import * as service from '../../service'

class BackupsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { backups: null, processing: false }
  }

  async componentDidMount() {
    let { data } = await service.get('/backups')
    this.setState({ backups: data.CommonPrefixes })
  }

  async execute(backup) {
    this.setState({ processing: true })
    let { data } = await service.post('/backups', { name: backup })
    console.log(data)
    this.setState({ processing: false })
  }

  render() {
    let backups = this.state.backups;
    if (!backups) return (<div>loading...</div>)
    if (backups.length == 0) return (<div>no backups...</div>)
    if (this.state.processing) return (<div>restore in progress....</div>)
    return (
      <div className={styles.section}>
        {
          backups.map((backup, idx) => {
            return (
              <div key={idx} className={styles.item} onClick={() => { this.execute(backup.Prefix) }}>
                backup {idx + 1}: {backup.Prefix}
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default BackupsPage;
