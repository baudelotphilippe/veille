import React from "react";

export default class Liens extends React.Component{
  constructor(props) {
    super(props);  
  }

  render() {
    return (
      <ul>
        {
          this.props.liens
            .map(lien =>
              <li key={lien.id}>{lien.url}</li>
            )
        }
      </ul>
    )
  }
}