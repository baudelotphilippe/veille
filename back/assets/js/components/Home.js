import React from 'react';
import Liens from './Liens';
import AddLien from './AddLien';

class Home extends React.Component {
  render() {
    return (
      <>
      <AddLien/>
        <Liens/>
      </>
    )
  }
}

export default Home;