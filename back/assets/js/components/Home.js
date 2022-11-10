import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Home extends React.Component {

  state = {
    liens: []
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/api/liens`)
      .then(res => {
        const liens = res.data["hydra:member"];
        console.log(liens)
        this.setState({ liens });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.liens
            .map(lien =>
              <li key={lien.id}>{lien.url}</li>
            )
        }
      </ul>
    )
  }
}

export default Home;