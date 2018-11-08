import classNames from '@sindresorhus/class-names'

export default ({
  stage,
  onStageSelect,
  active
}) => {
  const { id, title, summary } = stage

  const handleClick = () => onStageSelect(id)

  return (
    <div
      role='button'
      tabIndex='0'
      onClick={handleClick}
      className={classNames('link', { active })}
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

          .link.active {
            color: #FD5177;
          }

          .summary {
            opacity: .8;
            font-size: .8em;
          }
        `}
      </style>
      <h2>{title}</h2>
      <p className='summary'>{summary}</p>
    </div>
  )
}
