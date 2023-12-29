import Image from 'next/image'
import Link from 'next/link';
import Head from 'next/head';
import { getSortedPostsData } from '../lib/posts';

export default function Home({ allPostsData }) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Head>
          <title>toy project</title>
        </Head>
        <h1>
          <Link href="/board/first-post">FirstPost</Link>
        </h1>
        <h1>
          <Link href="/1">This page could not be found.</Link>
        </h1>
        <Image src="/images/백준.png" alt="Your Name" className="dark:invert" width={500} height={300} priority/>
        <section>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </section>
      </div>
    </main>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}