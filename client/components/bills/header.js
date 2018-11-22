import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs'
import printDate from '../../helpers/print-date'

const Attributes = ({ attrs = [] }) => (
  <div className='attributes'>
    <style jsx>
      {`
        .attributes {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }

        .attr {
          padding: 5px 30px;
          text-align: left;
        }

        .attr-title {
          display: block;
          color: #2b3245;
          font-size: 16px;
        }

        .attr-value {
          display: block;
          color: #2b3245;
          font-size: 18px;
          font-weight: 600;
        }
      `}
    </style>
    {attrs.map(({ title, value }) => (
      <div className='attr' key={`${title}-${value}`}>
        <span className='attr-title'>{title}</span>
        <span className='attr-value'>{value}</span>
      </div>
    ))}
  </div>
)

const Authors = ({ authors }) => (
  <div className='authors'>
    <style jsx>
      {`
        .authors {
          text-align: left;
          max-height: 75px;
          overflow-y: scroll;
        }

        .authors table {
          width: 100%;
        }

        .authors th {
          color: #2b3245;
          font-size: 18px;
          font-weight: 600;
        }

        .authors :global(tbody tr:nth-child(odd)) {
          background-color: #eef1f6;
        }
      `}
    </style>
    <table>
      <thead>
        <tr>
          <th>Firmante</th>
          <th>Distrito</th>
          <th>Bloque</th>
        </tr>
      </thead>
      <tbody>
        {authors.map(({ id, fullname, party, jurisdiction }) => (
          <tr key={id}>
            <td>{fullname}</td>
            <td>{jurisdiction ? jurisdiction.name : '-'}</td>
            <td>{party || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const Header = ({ stage }) => {
  resetIdCounter()

  const hasAuthors = !!stage.authors && stage.authors.length > 0

  return (
    <div className='header'>
      <style jsx>
        {`
          h2 {
            color: #fe3e68;
            padding: 9px 0;
            margin: 0 0 23px;
            font-size: 24px;
            font-weight: 600;
          }

          .header :global(.bill-tablist) {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            display: grid;
            grid-template-columns: repeat(${hasAuthors ? '3' : '2'}, 1fr);
            padding-bottom: 26px;
            border-bottom: 1px solid #e0e0e0;
          }

          .header :global(.bill-tab) {
            padding: 0 5px;
            color: #9196a4;
            font-size: 18px;
            list-style: none;
            cursor: pointer;
          }

          .header :global(.active) {
            color: #fe3e68;
            font-weight: 600;
          }

          .header :global(.submenu) {
            max-width: 880px;
            margin: 0 auto;
          }
        `}
      </style>
      <h2>{stage.title}</h2>
      <Tabs selectedTabClassName='active' className='submenu'>
        <TabList className='bill-tablist'>
          <Tab className='bill-tab'>Información General</Tab>
          <Tab className='bill-tab'>Descripción</Tab>
          {hasAuthors && (
            <Tab className='bill-tab'>Firmantes</Tab>
          )}
        </TabList>
        <TabPanel>
          <Attributes
            attrs={[
              { title: 'Fecha', value: printDate(stage.stageDate) },
              { title: 'Estado', value: stage.currentCondition || '-' },
              { title: 'Tratado por', value: 'Recinto de la Cámara Revisora' },
              { title: 'Próximos Pasos', value: stage.nextCondition || '-' }
            ]}
          />
        </TabPanel>
        <TabPanel>
          <Attributes
            attrs={[
              { title: 'Tipo', value: 'Proyecto de Ley' },
              { title: 'Nº Expediente', value: stage.identification },
              { title: 'Origen', value: 'Diputados' }
            ]}
          />
        </TabPanel>
        {hasAuthors && (
          <TabPanel>
            <Authors authors={stage.authors} />
          </TabPanel>
        )}
      </Tabs>
    </div>
  )
}
export default Header
