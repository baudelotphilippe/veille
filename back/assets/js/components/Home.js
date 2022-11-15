import React from "react";
import Liens from "./Liens";
import AddLien from "./AddLien";
import { Link } from "react-router-dom";
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

  delete = (id) => {
    console.log("delete", id);
    axios.delete(`http://127.0.0.1:8000/api/liens/${id}`).then((res) => {
      this.loadAll();
    });
  };

  render() {
    return (
      <div className="container">
        <Link to="/login">Login</Link>
        <h1>Gestionnaire de liens</h1>
        <article>
          <section>
            <AddLien loadAll={this.loadAll} />
          </section>
          <section>
            <Liens liens={this.state.liens} delete={this.delete} />
          </section>
        </article>
      </div>
    );
  }
}

export default Home;
