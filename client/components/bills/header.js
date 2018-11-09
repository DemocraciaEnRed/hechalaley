import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs'

const Header = () => {
  resetIdCounter()

  return (
    <div className='header'>
      <style jsx>
        {`
          .header :global(.bill-tab) {
            display: inline-block;
            padding: 0 50px;
            color: #9196a4;
          }

          .header :global(.active) {
            color: #fe3e68;
          }

          .header :global(.bill-tablist) {
            padding-bottom: 32px;
            border-bottom: 1px solid #e0e0e0;
          }

          .header :global(.submenu) {
            max-width: 700px;
            margin: 0 auto;
          }
        `}
      </style>
      <Tabs selectedTabClassName='active' className='submenu'>
        <TabList className='bill-tablist'>
          <Tab className='bill-tab'>Información General</Tab>
          <Tab className='bill-tab'>Descripción</Tab>
          <Tab className='bill-tab'>Votantes</Tab>
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
