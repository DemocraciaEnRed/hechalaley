import Link from 'next/link'
import classNames from 'classnames'
import { flatten } from 'lodash'
import Button from './button'

const Sidebar = ({
  stages,
  onStageSelect,
  selected,
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
    {stages && stages.length > 0 && (
      <Stages
        selected={selected}
        stages={stages}
        onStageSelect={onStageSelect}
      />
    )}
  </div>
)

export default Sidebar

const Stages = ({ stages, selected, onStageSelect }) => (
  <div>
    {flatten(stages.map((fromStage, index) => {
      const isLastStage = index === stages.length - 1
      const fromSelected = selected.includes(fromStage.id)
      const fromComparing = fromSelected && selected.length > 1

      const views = [
        <StageLink
          key={fromStage.id}
          onStageSelect={onStageSelect}
          selected={fromSelected}
          comparing={fromComparing}
          stage={fromStage}
        />
      ]

      if (!isLastStage) {
        const toStage = stages[index + 1]
        const comparingBoth =
          fromSelected &&
          fromComparing &&
          selected.includes(toStage.id)

        views.push((
          <StagesCompareLink
            key={`${fromStage.id}-${toStage.id}`}
            stages={[fromStage, toStage]}
            selected={comparingBoth}
            onStageSelect={onStageSelect}
          />
        ))
      }

      return views
    }))}
  </div>
)

const StageLink = ({ stage, onStageSelect, comparing, selected }) => {
  const { id, title, summary } = stage

  const handleClick = () => onStageSelect([id])

  return (
    <div
      role='button'
      tabIndex='0'
      onClick={handleClick}
      className={classNames('link', { selected, comparing })}
    >
      <style jsx>
        {`
          .link {
            padding: 15px 20px;
            cursor: pointer;
            color: #fff;
          }

          .link:hover {
            background-color: rgba(255, 255, 255, .1);
          }

          .selected {
            color: #FD5177;
          }

          .selected.comparing {
            color: #fff;
          }

          .summary {
            opacity: .8;
            font-size: .8em;
          }
        `}
      </style>
      <h2>{title}</h2>
      {/* selected && !comparing && <p>{summary}</p> */}
      <p className='summary'>{summary}</p>
    </div>
  )
}

const StagesCompareLink = ({ stages, selected, onStageSelect }) => {
  const handleClick = () => onStageSelect(stages.map((stage) => stage.id))

  return (
    <div
      role='button'
      tabIndex='0'
      onClick={handleClick}
      className={classNames('link', { selected })}
    >
      <style jsx>
        {`
          .link {
            margin-top: 10px;
            margin-bottom: 10px;
            padding: 10px 20px;
            cursor: pointer;
            color: #fff;
          }

          .link:hover {
            background-color: rgba(255, 255, 255, .1);
          }

          .selected {
            color: #FD5177;
          }
        `}
      </style>
      <p>↕ comparar cambios</p>
    </div>
  )
}
