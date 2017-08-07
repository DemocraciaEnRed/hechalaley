import Link from 'next/link'
import classNames from 'classnames'

const Sidebar = ({
  onStageSelect,
  stages = [],
  comparing,
  current
}) => {
  return (
    <div className='sidebar'>
      <style jsx>{`
        .sidebar {
          position: relative;
        }

        .logo {
          padding: 48px 20px 20px;
          width: 100%;
        }
      `}</style>
      <Link href='/'>
        <a>
          <img
            src='/static/logo-white.png'
            alt='Hecha la Ley'
            className='logo' />
        </a>
      </Link>
      {stages.map((stage) => (
        <StageLink
          key={stage.id}
          onStageSelect={onStageSelect}
          comparing={comparing === stage.id}
          current={current === stage.id}
          {...stage} />
      ))}
    </div>
  )
}

export default Sidebar

const StageLink = ({
  id,
  title,
  summary,
  current,
  comparing,
  onStageSelect
}) => {
  const handleClick = () => onStageSelect(id)

  return (
    <div
      onClick={handleClick}
      className={classNames('link', { current, comparing })}>
      <style jsx>{`
        .link {
          cursor: pointer;
        }

        .current {
          color: #fff;
        }

        .comparing {
          color: #aaa;
        }
      `}</style>
      <h2>{title}</h2>
      {current && (
        <p>{summary}</p>
      )}
    </div>
  )
}
