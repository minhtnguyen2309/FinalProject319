import React from 'react';
import styles from './Aboutus.module.css';

const Aboutus = () => {
  return (
    <div className={styles.teamContainer}>
      <div className={styles.teamMember}>
        <img
          src="/images/minh.jpg"
          alt="Minh Nguyen"
        />
        <h3>Minh Nguyen</h3>
        <p><strong>Course:</strong> SE/COMS 3190 - Construction of User Interfaces</p>
        <p><strong>Professor:</strong> Dr. Abraham Aldaco</p>
        <p><strong>Date:</strong> 02-09-2025</p>
        <p>Email: <a href="mailto:tamminh@iastate.edu">tamminh@iastate.edu</a></p>
      </div>

      <div className={styles.teamMember}>
        <img
          src="/images/bach.jpg"
          alt="Bach Nguyen"
        />
        <h3>Bach Nguyen</h3>
        <p><strong>Course:</strong> SE/COMS 3190 - Construction of User Interfaces</p>
        <p><strong>Professor:</strong> Dr. Abraham Aldaco</p>
        <p><strong>Date:</strong> 02-09-2025</p>
        <p>Email: <a href="mailto:ntbach@iastate.edu">ntbach@iastate.edu</a></p>
      </div>
    </div>
  );
};

export default Aboutus;
