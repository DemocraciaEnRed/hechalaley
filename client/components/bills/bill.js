/* eslint-disable react/jsx-no-comment-textnodes */
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
          padding: 0 30px;
        }

        .fluid-content {
          position: relative;
          padding-right: 15px;
          padding-left: 15px;
          max-width: 1410px;
          margin: 0 auto;
        }

        .bill-header {
          background: #fff;
          text-align: center;
          padding: 50px 0;
          margin: 30px auto 10px;
          border-radius: 10px;
          max-width: 1380px;
        }

        .bill-text-card {
          background-color: #fff;
          border-radius: 10px;
        }

        .bill-text-no_compare_container {
          max-width: 100%;
          margin: 0 auto;
          padding: 0 140px;
        }

        h1 {
          color: #2b3245;
          font-size: 40px;
          font-weight: 700;
          hyphens: auto;
        }

        p {
          color: #fe3e68;
          padding: 9px 0;
          margin-bottom: 23px;
          font-size: 18px;
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
        billTitle={bill.title}
      />
    </div>
    <main className='content'>
      <div className='fixed-content bill-header'>
        <h1>{bill.title}</h1>
        <p>{
          /**
         * @todo Show the selected stage title
         */
          bill.stages[0].title
        }
        </p>

        {/**
         * @todo reuse getSelectedStages to render the stages
         */
          comparing
          ? <StagesHeaders stages={getSelectedStages(bill.stages, selectedStagesIds)} />
          : <Header {...bill} />}
      </div>
      <div className={comparing ? 'fluid-content' : 'fixed-content'}>
        <div className='bill-text-card'>
          {comparing
            ?
              <BillTextCompare text={text} diff={selectedStagesIds.length > 1} />
            :
              <div className='bill-text-no_compare_container'>
                <BillText text={text} />
              </div >}
        </div>
      </div>
    </main>
  </Layout>
)

export default Bill
