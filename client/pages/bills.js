import { PureComponent } from 'react'
import pathMatch from 'path-match'
import Layout from '../components/layout'

const route = pathMatch('/bills/:id')

export default class Page extends PureComponent {
  static async getInitialProps ({ req, pathname }) {
    if (req) return req.locals

    const { id } = route(pathname) || {}

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
            grid-template-areas: 'left-sidebar main-content';
            grid-template-rows: 100vh;
          }

          .sidebar {
            grid-area: left-sidebar;
            background-color: #2b3245;
          }

          .main-content {
            grid-area: main-content;
          }
        `}</style>
        <div className='sidebar'>Hecha la Ley</div>
        <main className='main-content'>{bill.id}</main>
      </Layout>
    )
  }
}
