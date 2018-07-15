import fetch from 'isomorphic-fetch'
import Layout from '../components/layout'
import Cover from '../components/home/cover'
import BillCard from '../components/home/bill-card'
import BillCardsList from '../components/home/bill-cards-list'

const Page = ({ bills }) => (
  <Layout>
    <Cover />
    <BillCardsList>
      {bills.map((bill) => <BillCard key={bill.id} {...bill} />)}
    </BillCardsList>
  </Layout>
)

Page.getInitialProps = async ({ req }) => {
  if (req) return req.locals

  const res = await fetch('/api/bills?published=true')
  const bills = await res.json()

  return { bills }
}

export default Page
