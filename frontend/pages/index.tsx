import Link from 'next/link';
import Layout from '../components/Layout';

const IndexPage = () => (
  <>
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/home">
        <a>Home</a>
      </Link>
    </p>
  </>
);

export default IndexPage;
