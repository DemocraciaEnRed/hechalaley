import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs'
import printDate from '../../helpers/print-date'

const StageHeader = ({ stage }) => {
  resetIdCounter()

  return (
    <div className='stage-header'>
      <style jsx>
        {`
          .stage-header {
            margin-bottom: 3rem;
          }

          .stage-header:first-of-type {
            border-right: 1px solid #e0e0e0;
          }

          .stage-header :global(.bill-tab) {
            display: inline-block;
            padding: 0 50px;
            color: #9196a4;
          }

          .stage-header :global(.active) {
            color: #fe3e68;
          }

          .stage-header :global(.bill-tablist) {
            padding-bottom: 32px;
          }

          .submenu {
            margin-bottom: 3em;
          }

          .stage-header :global(.active) {
            font-weight: bold;
          }

          .stage-data {
            display: inline-block;
            margin: 0 45px;
            font-size: 18px;
            color: #2b3245;
            font-weight: 100;
          }

          .stage-data::before {
            content: ' ';
            widht: 2px;
            background-color: grey;
          }

          .stage-data-details {
            padding-top: 5px;
            font-size: 22px;
            font-weight: 500;
            display: block;
          }

          .stage-header :global(.stage-data-wrapper) {
            text-align: left;
          }
        `}
      </style>
      <Tabs selectedTabClassName='active' className='submenu'>
        <TabList className='bill-tablist'>
          <Tab className='bill-tab'>Información General</Tab>
          <Tab className='bill-tab'>Descripción</Tab>
          <Tab className='bill-tab'>Votantes</Tab>
        </TabList>
        <TabPanel className='stage-data-wrapper'>
          <ul>
            <li className='stage-data'>
              Fecha
              <span className='stage-data-details'>{printDate(stage.stageDate)}</span>
            </li>
            <li className='stage-data'>
              Estado
              <span className='stage-data-details'>Rechazado</span>
            </li>
            <li className='stage-data'>
              Próximos Pasos
              <span className='stage-data-details'>Sin definir</span>
            </li>
          </ul>
        </TabPanel>
        <TabPanel>
          <p>{stage.summary}</p>
        </TabPanel>
        <TabPanel>
          bleh
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default ({ stages }) => (
  <div className='bill-text-compare'>
    <style jsx>
      {`
        .bill-text-compare {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 0 15px;
        }
      `}
    </style>
    {stages.map((stage) => <StageHeader stage={stage} />)}
    {stages.length === 1 && (
      <div>Seleccioná una etapa para comparar cambios</div>
    )}
  </div>
)
