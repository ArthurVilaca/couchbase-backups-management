import React, { Component } from 'react';
import styles from './backups.module.css';

import * as service from '../../service'

class BackupsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { backups: null }
  }

  async componentDidMount() {
    let { data } = await service.get('/backups')
    this.setState({ backups: data.CommonPrefixes })
  }


  render() {
    let backups = this.state.backups;
    if (!backups) return (<div>loading...</div>)
    if (backups.length == 0) return (<div>no backups...</div>)
    return (
      <div className={styles.section}>
        {
          backups.map((backup, idx) => {
            return (
              <div className={styles.item}>
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
