import { PureComponent } from 'react'
import Layout from '../components/layout'
import Sidebar from '../components/bills/sidebar'

export default class Page extends PureComponent {
  static async getInitialProps ({ req, pathname, query: { id } }) {
    if (req) return req.locals

    const res = await fetch(`/api/bills/${id}?populate.coSigners=1&published=true`)
    const bill = await res.json()

    return { bill }
  }

  constructor () {
    super()

    this.state = {
      comparing: []
    }
  }

  componentWillReceiveProps ({ bill: { stages } = {} }) {
    if (!stages || stages.length < 2) return

    // Compare 2 newest stages
    const comparing = stages.slice(-2).map((stage) => stage.id)

    this.setState({ comparing })
  }

  render () {
    const { bill } = this.props

    return (
      <Layout className='bills-page'>
        <style jsx>{`
          :global(.bills-page) {
            display: grid;
            grid-template-columns: 240px 1fr;
            grid-template-areas: 'sidebar content';
            grid-template-rows: 100vh;
          }

          .sidebar {
            grid-area: sidebar;
            background-color: #2b3245;
          }

          .content {
            grid-area: content;
          }
        `}</style>
        <div className='sidebar'>
          <Sidebar stages={bill.stages} />
        </div>
        <main className='content'>{bill.id}</main>
      </Layout>
    )
  }
}
