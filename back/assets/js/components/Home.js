import React from "react";
import Liens from "./Liens";
import AddLien from "./AddLien";
import Topbar from "./Topbar";

import axios from "axios";
import * as AxiosServices from "../services/AxiosService";
class Home extends React.Component {
  state = {
    liens: [],
  };

  async componentDidMount() {
    const data = await AxiosServices.loadAll()
    this.setState({ liens: data });
  }

  delete = (id) => {
    console.log("delete", id);
    axios.delete(`http://127.0.0.1:8000/api/liens/${id}`).then((res) => {
      this.loadAll();
    });
  };

  render() {
    return (
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
        <h1>Gestionnaire de liens</h1>
        <Topbar />
        </div>
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
