import { PureComponent } from 'react'
import Bill from '../components/bills/bill'

export default class Page extends PureComponent {
  static async getInitialProps ({ req, pathname, query: { id } }) {
    if (req) return req.locals

    const res = await fetch(`/api/bills/${id}?populate.coSigners=1&published=true`)
    const bill = await res.json()

    return { bill }
  }

  static getStateFromProps ({ bill: { stages = [] } = {} }) {
    return {
      selected: stages.length === 0 ? null : [stages[0].id],
      text: null
    }
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
    const { selected } = this.state

    if (!selected) return

    const [fromStage, toStage] = selected

    const url = toStage
      ? `/api/bills/${id}/diff/${fromStage}/${toStage}?published=true`
      : `/api/bills/${id}/stages/${fromStage}/text?published=true`

    const res = await fetch(url)
    const text = await res.text()

    this.setState({ text })
  }

  handleStageSelect = ([fromStage, toStage]) => { // eslint-disable-line no-undef
    this.setState({
      selected: toStage ? [fromStage, toStage] : [fromStage],
      text: null
    }, this.fetchStageText)
  }

  render () {
    const { bill } = this.props

    return (
      <Bill
        onStageSelect={this.handleStageSelect}
        bill={bill}
        {...this.state} />
    )
  }
}
