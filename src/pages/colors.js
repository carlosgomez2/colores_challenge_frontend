import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import { UserContext } from '../context/UserContext';
import Head from '../components/Head';

const Colors = () => {
  const { value, setValue } = useContext(UserContext);
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [colors, setColors] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const colorsPerPage = 6;
  const pagesVisited = pageNumber * colorsPerPage;

  useEffect(async () => {
    await fetch('http://127.0.0.1:3001/colors.json', {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      if (res.status != 200) throw new Error(`Not expecting status code ${res.status}`);
      return res.json();
    })
    .then(colors => {
      if (!colors) throw new Error('Cannot get colors');
      setColors(colors);
      return setIsDataAvailable(true);
    })
  }, []);

  const displayColors = colors.slice(pagesVisited, pagesVisited + colorsPerPage).map((color) => {
    return (
      <div className="col-sm-12 col-md-4" key={color.id}>
        <Link href={`/colors/${color.id}`}> 
          <div className="card my-1 p-4 d-flex color-item" style={{ color: "#F5F5F5", backgroundColor: color.color, textShadow: "1px 1px 2px black" }}>
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
            <Head title="Colors" />

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
