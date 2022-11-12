import React from "react";
import Liens from "./Liens";
import AddLien from "./AddLien";
import axios from "axios";
class Home extends React.Component {
  state = {
    liens: [],
  };

  componentDidMount() {
    this.loadAll();
  }

  loadAll = () => {
    axios.get(`http://127.0.0.1:8000/api/liens`).then((res) => {
      const liens = res.data["hydra:member"];
      this.setState({ liens: liens });
    });
  };

  render() {
    return (
      <div className="container">
        <h1>Gestionnaire de liens</h1>
        <article>
        <section><AddLien loadAll={this.loadAll} /></section>
        <section><Liens liens={this.state.liens} /></section>
        </article>
      </div>
    );
  }
}

export default Home;
