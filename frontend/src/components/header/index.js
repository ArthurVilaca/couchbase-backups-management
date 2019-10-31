import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom'

import styles from './header.module.css';

class Header extends Component {

  render() {
    return (
      <header className={styles.header}>
        <div className={styles.divInline}>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);