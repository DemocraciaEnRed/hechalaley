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

  static getStateFromProps ({ bill: { stages = [] } = {} }) {
    const state = {
      current: null,
      comparing: null
    }

    if (stages.length === 0) return state

    state.current = stages[0].id

    // Compare 2 newest stages by default
    if (stages.length >= 2) state.comparing = stages[1].id

    return state
  }

  constructor (props) {
    super(props)
    this.state = Page.getStateFromProps(props)
  }

  componentWillReceiveProps (props) {
    this.setState(Page.getStateFromProps(props))
  }

  handleStageSelect = (newId) => { // eslint-disable-line no-undef
    const { bill: { stages = [] } = {} } = this.props

    const count = stages.length
    let current
    let comparing

    for (let i = 0; i < count; i++) {
      const id = stages[i].id

      if (current) {
        comparing = id
        break
      }

      if (id === newId) current = id
    }

    this.setState({ current, comparing })
  }

  render () {
    const { bill: { id, stages } } = this.props
    const { current, comparing } = this.state

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
          <Sidebar
            onStageSelect={this.handleStageSelect}
            stages={stages}
            comparing={comparing}
            current={current} />
        </div>
        <main className='content'>{id}</main>
      </Layout>
    )
  }
}
