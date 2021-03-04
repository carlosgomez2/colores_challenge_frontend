import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import { UserContext } from '../context/UserContext';

const Colors = () => {
  const { value, setValue } = useContext(UserContext);
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [colors, setColors] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const colorsPerPage = 6;
  const pagesVisited = pageNumber * colorsPerPage;

  console.log(`User value ${value}`);

  useEffect(async () => {
    await fetch('http://127.0.0.1:3001/colors.json', {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      console.log(res.status);
      if (res.status != 200) throw new Error(res);
      return res.json();
    })
    .then(colors => {
      if (!colors) throw new Error(res);
      setColors(colors);
      return setIsDataAvailable(true);
    })
  }, []);

  const displayColors = colors.slice(pagesVisited, pagesVisited + colorsPerPage).map((color) => {
    return (
      <div className="col-sm-12 col-md-4" key={color.id}>
        <Link href={`/colors/${color.id}`}> 
          <div className="card my-1 p-4 d-flex color-item" style={{ backgroundColor: color.color }}>
            <div className="d-flex align-items-start">
              <h6>{color.year}</h6>
            </div>
            <div className="mt-3 d-flex align-items-center justify-content-center">
              <h6>{color.name}</h6>
            </div>
            <div className="mb-3 d-flex align-items-center justify-content-center">
              <h4>{color.color}</h4>
            </div>
            <div className="mt-2 d-flex align-items-end justify-content-end">
              <h6>{color.pantone}</h6>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  const pageCount = Math.ceil(colors.length / colorsPerPage);

  const changePage = ({selected}) => {
    setPageNumber(selected);
  }

  return (
      (isDataAvailable) ? 
      (
        <>
          <div className="container text-center">
            <h1 className="my-4 display-4">Colores</h1>
            <div className="row">
              {displayColors}
              <ReactPaginate
                previousLabel={"< Anterior"}
                nextLabel={"Siguiente >"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBtns"}
                previousLinkClassName={"previousBtns"}
                nextLinkClassName={"nextBtns"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </div>
          </div>
        </>
      ) :
      (
        <div className="container-fluid text-center mt-5">
          <h3>Obteniendo datos...</h3>
          <div className="spinner-grow mx-1 text-primary" role="status">
            <span className="visually-hidden"></span>
          </div>
          <div className="spinner-grow mx-1 text-success" role="status">
            <span className="visually-hidden"></span>
          </div>
          <div className="spinner-grow mx-1 text-warning" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      )
  );
}

export default Colors;
