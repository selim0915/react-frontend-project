import Link from 'next/link';

export default function FirstPost({ data }) {
  if(data === null){
    return null;
  }

  return (
    <>
      <Link href="/">Back to home</Link>

      <div>
          <ol>
              {data.map((item, index) => (
                  <li key={index}>{item.mission_name}</li>
              ))}
          </ol>
      </div>
    </>
  )
}

export async function getServerSideProps() {
    const res = await fetch('https://api.spacexdata.com/v3/launches');
    const data = await res.json();

    return { 
        props: { data }
    }
}