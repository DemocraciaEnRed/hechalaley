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

          .submenu {
            margin-bottom: 3em;
          }

          .stage-header :global(.active) {
            font-weight: bold;
          }
        `}
      </style>
      <Tabs selectedTabClassName='active' className='submenu'>
        <TabList>
          <Tab>Información General</Tab>
          <Tab>Descripción</Tab>
          <Tab>Votantes</Tab>
        </TabList>
        <hr />
        <TabPanel>
          <ul>
            <li>Fecha {printDate(stage.stageDate)}</li>
            <li>Estado Rechazado</li>
            <li>Próximos Pasos: Sin definir</li>
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
