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
      <>
        <AddLien loadAll={this.loadAll} />
        <Liens liens={this.state.liens} />
      </>
    );
  }
}

export default Home;
