import Layout from '../layout'
import Sidebar from './sidebar'
import Header from './header'
import { BillText, BillTextCompare } from '../bill-text'

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
        <Header {...bill} />
      </div>
      {comparing
        ? <div className='fluid-content'><BillTextCompare text={text} diff={selectedStagesIds.length > 1} /></div>
        : <div className='fixed-content'><BillText text={text} /></div>}
    </main>
  </Layout>
)

export default Bill
