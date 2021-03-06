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
}) => {
  const currentStages = getSelectedStages(bill.stages, selectedStagesIds)

  return (
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
            padding: 50px 30px;
            margin: 30px auto 10px;
            border-radius: 10px;
            max-width: 1380px;
          }

          .bill-text-card {
            padding: 60px 30px;
            border-radius: 10px;
            background-color: #fff;
          }

          .bill-text-no_compare_container {
            max-width: 1000px;
            margin: 0 auto;
          }

          h1 {
            color: #2b3245;
            font-size: 40px;
            font-weight: 700;
            hyphens: auto;
          }

          h3 {
            color: #fe3e68;
            padding: 9px 0;
            margin: 0 0 23px;
            font-size: 24px;
            font-weight: 600;
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
          {comparing && (
            <h3>Comparación de cambios</h3>
          )}
          {comparing
            ? <StagesHeaders stages={currentStages} />
            : <Header stage={currentStages[0]} />}
        </div>
        <div className={comparing ? 'fluid-content' : 'fixed-content'}>
          <div className='bill-text-card'>
            {comparing && <BillTextCompare text={text} diff={currentStages.length > 1} />}
            {!comparing && (
              <div className='bill-text-no_compare_container'>
                <BillText text={text} />
              </div >
            )}
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Bill
