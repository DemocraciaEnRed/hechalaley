import Link from 'next/link'
import Button from './button'
import SidebarStage from './sidebar-stage'

const Sidebar = ({
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
    <Button active={comparing} onClick={onToggleComparing}>
      Comparar cambios
    </Button>
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
