import Link from 'next/link'
import Button from './button'
import SidebarStage from './sidebar-stage'

const Sidebar = ({
  billTitle,
  stages,
  onStageSelect,
  selectedStagesIds,
  comparing,
  onToggleComparing
}) => (
  <div className='sidebar'>
    <style jsx>
      {`
        .sidebar {
          position: relative;
        }

        .logo {
          padding: 48px 20px 20px;
          width: 100%;
        }
        p {
          color: #fefefe;
          font-size: 16px;
          text-align: center;
          margin-bottom: 45px;
        }
        .line{
          display: block;
          background-color: #707070;
          opacity: 0.5;
          height: 2px;
          width: 90%;
          margin: 80px auto 20px;
        }
      `}
    </style>
    <Link href='/'>
      <a>
        <img
          src='/static/logo-white.png'
          alt='Hecha la Ley'
          className='logo'
        />
      </a>
    </Link>
    <p>{billTitle}</p>
    <Button active={comparing} onClick={onToggleComparing}>
      Comparar cambios
    </Button>
    <span className='line' />
    {stages && stages.map((stage) => (
      <SidebarStage
        key={stage.id}
        stage={stage}
        onStageSelect={onStageSelect}
        active={selectedStagesIds.includes(stage.id)}
      />
    ))}
  </div>
)

export default Sidebar
