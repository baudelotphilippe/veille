import React, { useEffect } from "react";

const Liens = ({ lesLiens, isConnected, supp }) => {
  const handleSupp = (id) => {
    supp(id);
  };
  return (
    <>
      {lesLiens.map((lien) => {
        const datePublish = lien.createdAt.split("T");
        const dayPublish = datePublish[0].split("-");
        return (
          <div className="lien m-1 p-3" key={lien.id}>
            <div className="">
              <a href={lien.url}>{lien.url}</a>
            </div>
            <div className="mt-2 heure d-flex justify-content-between align-items-center">
              <span>
                <i className="me-2 fa-solid fa-clock"></i>
                {dayPublish[2]} {dayPublish[1]} {dayPublish[0]}
              </span>

              {isConnected && (
                <i
                  className="fa-solid fa-trash delete"
                  onClick={() => handleSupp(lien.id)}
                ></i>
              )}
            </div>
            <div>
              { lien.tags.map((tag)=> 
                <span className="badge bg-info text-dark mx-1">{tag.label}</span>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Liens;
