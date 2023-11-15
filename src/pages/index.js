import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ results }) {
  console.log(results);
  return (
    <>
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>東京都のレストラン一覧</h1>
      <ul>
          {results.shop.map((shop) => {
            return  <li key={shop.id}>{shop.name}</li>
          })}
      </ul>
    </main>
    </>
  )
}


export async function getServerSideProps() {
  // APIからデータを取得、large_areaは東京に設定
  const res = await fetch(`http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.API_KEY}&large_area=Z011&format=json
  `)
  const json = await res.json()
  const { results } = json;

  return { props: { results } };
}
 