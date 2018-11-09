import Layout from '../layout'
import { BillText, BillTextCompare } from '../bill-text'
import Sidebar from './sidebar'
import Header from './header'
import StagesHeaders from './stages-headers'

const getSelectedStages = (stages, selected) =>
  selected.map((id) => stages.find((stage) => stage.id === id))

const Bill = ({
  bill,
  selectedStagesIds,
  text,
  onStageSelect,
  comparing,
  onToggleComparing
}) => (
  <Layout className='bills-page'>
    <style jsx>
      {`
        :global(.bills-page) {
          display: grid;
          grid-template-columns: 240px 1fr;
          grid-template-areas: 'sidebar content';
        }

        .sidebar {
          grid-area: sidebar;
          background-color: #2b3245;
        }

        .content {
          grid-area: content;
        }

        .fixed-content {
          position: relative;
          margin-right: auto;
          margin-left: auto;
          padding-right: 15px;
          padding-left: 15px;
          max-width: 700px;
        }

        .fluid-content {
          position: relative;
          padding-right: 15px;
          padding-left: 15px;
        }

        h1 {
          color: #2b3245;
          font-size: 3em;
          font-weight: 700;
          letter-spacing: .8px;
          margin-top: 2em;
          margin-bottom: 1em;
          hyphens: auto;
        }
      `}
    </style>
    <div className='sidebar'>
      <Sidebar
        onStageSelect={onStageSelect}
        onToggleComparing={onToggleComparing}
        selectedStagesIds={selectedStagesIds}
        stages={bill.stages}
        comparing={comparing}
      />
    </div>
    <main className='content'>
      <div className='fixed-content'>
        <h1>{bill.title}</h1>
      </div>
      <div className={comparing ? 'fluid-content' : 'fixed-content'}>
        {comparing
          ? <StagesHeaders stages={getSelectedStages(bill.stages, selectedStagesIds)} />
          : <Header {...bill} />}
        {comparing
          ? <BillTextCompare text={text} diff={selectedStagesIds.length > 1} />
          : <BillText text={text} />}
      </div>
    </main>
  </Layout>
)

export default Bill
