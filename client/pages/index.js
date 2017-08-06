import Layout from '../components/layout'
import Cover from '../components/home/cover'
import BillCard from '../components/home/bill-card'
import { CardsList } from '../components/card'

const Page = ({ bills }) => (
  <Layout>
    <Cover />
    <CardsList>
      {bills.map((bill) => <BillCard key={bill.id} {...bill} />)}
    </CardsList>
  </Layout>
)

Page.getInitialProps = async ({ req }) => {
  if (req) return req.locals

  const res = await fetch('/api/bills?published=true')
  const bills = await res.json()

  return { bills }
}

export default Page
