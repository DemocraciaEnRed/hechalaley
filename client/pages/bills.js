import { PureComponent } from 'react'
import Layout from '../components/layout'
import Sidebar from '../components/bills/sidebar'
import Header from '../components/bills/header'
import Text from '../components/bills/text'

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
      comparing: null,
      text: null
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

  componentDidMount () {
    this.fetchStageText()
  }

  fetchStageText = async () => { // eslint-disable-line no-undef
    const { bill: { id } } = this.props
    const { current } = this.state

    if (!current) return

    const res = await fetch(`/api/bills/${id}/stages/${current}/text`)
    const text = await res.text()

    this.setState({ text })
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

    this.setState({ current, comparing }, this.fetchStageText)
  }

  render () {
    const { bill } = this.props
    const { stages } = bill
    const { current, comparing, text } = this.state

    return (
      <Layout className='bills-page'>
        <style jsx>{`
          :global(.bills-page) {
            display: grid;
            grid-template-columns: 240px 1fr;
            grid-template-areas: 'sidebar content';
            grid-template-rows: 100vh;
          }

          :global(.bills-content) {
            margin-right: auto;
            margin-left: auto;
            padding-right: 15px;
            padding-left: 15px;
            max-width: 700px;
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
        <main className='content'>
          <Header {...bill} />
          {text && (
            <Text text={text} />
          )}
        </main>
      </Layout>
    )
  }
}
