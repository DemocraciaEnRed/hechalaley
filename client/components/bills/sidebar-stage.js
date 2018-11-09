import classNames from '@sindresorhus/class-names'

export default ({
  stage,
  onStageSelect,
  active
}) => {
  const { id, title } = stage
  console.log(stage)

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

          .stage-commission {
            margin-bottom: 30px;
            outline: none;
          }

          h2{
            font-size: 20px;
            text-align: center;
            margin-bottom: 5px;
          }

          p {
            font-size: 14px;
          }
        `}
      </style>
      <h2>{title}</h2>
      <p>Tratado por:</p>
      {/**
       * @todo Display commissions from API
       */}
      <p className='stage-commission'>Comisiones de la Cámara de Origen</p>
    </div>
  )
}
