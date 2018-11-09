import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs'

const Header = ({ title }) => {
  resetIdCounter()

  return (
    <div className='header'>
      <style jsx>
        {`
          .header {
            margin-bottom: 3rem;
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

          .submenu {
            margin-bottom: 3em;
          }

          .header :global(.active) {
            font-weight: bold;
          }
        `}
      </style>
      <h1 className='bills-content'>{title}</h1>
      <Tabs
        selectedTabClassName='active'
        className='submenu bills-content'
      >
        <TabList>
          <Tab>Información General</Tab>
          <Tab>Descripción</Tab>
          <Tab>Votantes</Tab>
        </TabList>
        <TabPanel>
          <p>
            Ex pariatur et in ut aut veniam. Quia autem praesentium laboriosam quo
            quis. Non adipisci non enim distinctio nihil dolores assumenda
            consectetur.
          </p>
        </TabPanel>
        <TabPanel>
          <p>
            Vero aut animi at est rerum libero consequatur. Accusantium eius est
            similique et consequuntur animi quos eos.
          </p>
        </TabPanel>
        <TabPanel>
          <p>
          Fugiat quae atque qui officiis. Non temporibus est dolores delectus
          blanditiis est hic. Qui doloribus sint rem optio unde. Quibusdam omnis
          harum itaque ab possimus minus quo fugiat. Delectus sint autem ipsa non
          dignissimos eos qui. Est odio sed doloremque expedita nulla officia
          dolores et.
          </p>
        </TabPanel>
      </Tabs>
    </div>
  )
}
export default Header
