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

        .sidebar :global(.compare-button) {
          margin-bottom: 40px;
        }

        .line {
          display: block;
          background-color: #707070;
          opacity: 0.5;
          height: 2px;
          width: 90%;
          margin: 20px auto;
        }

        .select-stages {
          font-size: 14px;
          font-weight: 600;
          color: #fefefe;
          text-align: center;
          padding: 0 15px;
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
    <Button className='compare-button' active={comparing} onClick={onToggleComparing}>
      Comparar cambios
    </Button>
    {comparing && (
      <p className='select-stages'>Seleccioná las 2 etapas para comparar</p>
    )}
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
