import React, { Component } from 'react';
import styles from './footer.module.css';

class Footer extends Component {
  render() {
    return (
      <footer className={styles.footer}>
        <div className={styles.name}>Couchbase backup</div>
      </footer>
    );
  }
}

export default Footer;
