import { useState } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';

const Colors = ({colors}) => {
  const [pageNumber, setPageNumber] = useState(0);

  const colorsPerPage = 6;
  const pagesVisited = pageNumber * colorsPerPage;

  const displayColors = colors.slice(pagesVisited, pagesVisited + colorsPerPage).map((color) => {
    return (
      <div className="col-sm-12 col-md-4">
        <Link href={`/colors/${color.id}`} key={color.id}> 
          <div className="card my-1 p-4 d-flex color-item" style={{ backgroundColor: color.color }}>
            <div class="d-flex align-items-start">
              <h6>{color.year}</h6>
            </div>
            <div class="mt-3 d-flex align-items-center justify-content-center">
              <h6>{color.name}</h6>
            </div>
            <div class="mb-3 d-flex align-items-center justify-content-center">
              <h4>{color.color}</h4>
            </div>
            <div class="mt-2 d-flex align-items-end justify-content-end">
              <h6>{color.pantone}</h6>
            </div>
          </div>
        </Link>
      </div>
    );
  })

  const pageCount = Math.ceil(colors.length / colorsPerPage);

  const changePage = ({selected}) => {
    setPageNumber(selected)
  }

  return (
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
  );
}

export default Colors;

export const getStaticProps = async () => {
  var res = await fetch('http://127.0.0.1:3001/colors.json');
  var colors = await res.json();

  return {
    props: {
      colors,
    },
  };
};