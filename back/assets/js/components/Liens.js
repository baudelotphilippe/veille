import React from "react";

export default class Liens extends React.Component{
  constructor(props) {
    super(props);  

  }

  render() {
    return (
      <>
        {
          this.props.liens
            .map(lien => {
              const datePublish=lien.createdAt.split('T');
              const dayPublish=datePublish[0].split('-');
              return (
              <div className="lien m-1 p-3">
                <div className="" key={lien.id}><a href={lien.url}>{lien.url}</a></div> 
                <div className="heure d-flex justify-content-end align-items-center"><i className="me-2 fa-solid fa-clock"></i>{dayPublish[2]} {dayPublish[1]} {dayPublish[0]}</div>
                </div>
              )
            })
        }
      </>
    )
  }
}