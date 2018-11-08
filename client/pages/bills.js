import { PureComponent } from 'react'
import fetch from 'isomorphic-fetch'
import Bill from '../components/bills/bill'

export default class Page extends PureComponent {
  static async getInitialProps ({ req, query: { id } }) {
    if (req) return req.locals

    const res = await fetch(`/api/bills/${id}?populate.coSigners=1&published=true`)
    const bill = await res.json()

    return { bill }
  }

  static getStateFromProps ({
    selectedStagesIds = null,
    text = null,
    comparing = false,
    bill: { stages = [] } = {}
  }) {
    return {
      comparing,
      selectedStagesIds: selectedStagesIds || (stages.length === 0 ? null : [stages[0].id]),
      text
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
    if (!this.state.text) this.fetchStageText()
  }

  fetchStageText = async () => { // eslint-disable-line no-undef
    const { bill: { id } } = this.props
    const { selectedStagesIds } = this.state

    if (!selectedStagesIds) return

    const [fromStage, toStage] = selectedStagesIds

    const url = toStage
      ? `/api/bills/${id}/diff/${fromStage}/${toStage}?published=true`
      : `/api/bills/${id}/stages/${fromStage}/text?published=true`

    const res = await fetch(url)
    const text = await res.text()

    this.setState({ text })
  }

  handleStageSelect = (stageId) => {
    const { comparing } = this.state
    const selected = this.state.selectedStagesIds

    let selectedStagesIds

    if (comparing) {
      if (selected.length === 1 && selected[0] === stageId) return
      selectedStagesIds = selected.includes(stageId)
        ? selected.filter((id) => id !== stageId)
        : [stageId, selected[0]]
    } else {
      // stage is already selected
      if (selected[0] === stageId) return
      selectedStagesIds = [stageId]
    }

    this.setState({ selectedStagesIds, text: null }, this.fetchStageText)
  }

  handleToggleComparing = () => {
    this.setState({ comparing: !this.state.comparing })
  }

  render () {
    const { bill } = this.props

    return (
      <Bill
        onToggleComparing={this.handleToggleComparing}
        onStageSelect={this.handleStageSelect}
        bill={bill}
        {...this.state}
      />
    )
  }
}
