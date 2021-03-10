import Link from 'next/link';
import styles from './Head.module.css';

const Head = ({ title }) => {
  return (
    <Link href={`/colors`}>
      <div className={`${styles.custom_head} text-center mt-4 bg-info`}>
        <h1 className="my-4 display-4" style={{ cursor: 'pointer' }}>{title}</h1>
      </div>
    </Link>
  );
}

export default Head;