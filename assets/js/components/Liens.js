import React, { useEffect } from "react";

const Liens = ({ lesLiens, isConnected, supp, filter, idUser }) => {
  console.log("liens",idUser)

  const handleSupp = (id) => {
    supp(id);
  };
  const filterByTag = (id) => {
    filter(id)
  }
  return (
    <>
      {lesLiens.map((lien) => {
        const datePublish = lien.createdAt.split("T");
        const dayPublish = datePublish[0].split("-");
        let idUserLien=((lien.createur['@id']).split("/"))[3]
        // console.log(idUserLien)
        return (
          <div className="lien m-1 p-3" key={lien.id}>
            <div className="">
              <a href={lien.url}>{lien.url}</a>
            </div>
            <div className="mt-2 heure d-flex justify-content-between align-items-center">
              <div>
                <span className="me-2 ">
                  <i className="me-1 fa-solid fa-clock"></i>
                  {dayPublish[2]} {dayPublish[1]} {dayPublish[0]}
                </span>
                <span>
                  <i className="me-1 fa-solid fa-user-pen"></i>
                  {lien.createur.name}
                </span>
              </div>

              {isConnected && idUserLien==idUser && (
                <i
                  className="fa-solid fa-trash delete"
                  onClick={() => handleSupp(lien.id)}
                ></i>
              )}
            </div>
            <div>
              { lien.tags.map((tag)=> 
                <span className="badge bg-info text-dark mx-1 pointeur" onClick={() => filterByTag(tag)}>{tag.label}</span>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Liens;
