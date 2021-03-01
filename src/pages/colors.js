import Link from 'next/link';

const Colors = ({colors}) => {
  return (
    <>
      <div className="container text-center">
        <h2 className="my-4">Colores</h2>
        <div className="row">
          {colors.map((color) => (
            <div className="col-4">
              <Link href={`/colors/${color.id}`} key={color.id}>   
                <div className="card my-1 p-4 d-flex">
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
          ))}
        </div>
      </div>
    </>
  );
}

export default Colors;

export const getStaticProps = async () => {
  var res = await fetch('http://127.0.0.1:3001/colors.json');
  var colors = await res.json();
  console.log(colors)

  return {
    props: {
      colors,
    },
  };
};