import Layout from '../layout'
import Sidebar from './sidebar'
import Header from './header'
import Text from './text'

const Bill = ({
  bill,
  selected,
  text,
  onStageSelect
}) => (
  <Layout className='bills-page'>
    <style jsx>{`
      :global(.bills-page) {
        display: grid;
        grid-template-columns: 240px 1fr;
        grid-template-areas: 'sidebar content';
        grid-template-rows: 100vh;
      }

      :global(.bills-content) {
        margin-right: auto;
        margin-left: auto;
        padding-right: 15px;
        padding-left: 15px;
        max-width: 700px;
      }

      .sidebar {
        grid-area: sidebar;
        background-color: #2b3245;
      }

      .content {
        grid-area: content;
      }
    `}</style>
    <div className='sidebar'>
      <Sidebar
        onStageSelect={onStageSelect}
        bill={bill}
        selected={selected} />
    </div>
    <main className='content'>
      <Header {...bill} />
      {text && (
        <Text text={text} />
      )}
    </main>
  </Layout>
)

export default Bill
