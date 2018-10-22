import BillLink from '../bill-link'
const moment = require('moment')

const withNewestStage = (stages = [], cb) => cb(stages.slice(-1))

const BillCard = ({
  id,
  title,
  summary,
  stages
}) => (
  <BillLink id={id}>
    <a className='bill-card'>
      <style jsx>
        {`
          .bill-card {
            display: flex;
            flex-direction: column;
            z-index: 0;
            position: relative;
            margin: 15px;
            width: 350px;
            box-shadow:
              0 1px 3px rgba(0, 0, 0, .12),
              0 1px 2px rgba(0, 0, 0, .24);
            color: inherit;
            transition: all .3s cubic-bezier(.25, .8, .25, 1);
            border-radius: 1px;
            background-color: #fff;
            overflow: hidden;
            color: inherit;
            text-decoration: inherit;
            cursor: pointer;
          }

          .bill-card:hover {
            box-shadow:
              0 10px 20px rgba(0, 0, 0, .19),
              0 6px 6px rgba(0, 0, 0, .23);
          }

          .bill_header {
            padding: 20px 20px;
          }

          .title {
            max-height: 100px;
          }

          .title h1 {
            color: #2b3245;
            display: block;
            font-size: 20px;
            font-weight: 600;
          }

          .title span {
            color: #808080;
            display: block;
            font-size: 13px;
            font-weight: 400;
            line-height: .5;
            margin-bottom: 13px;
          }

          .stage_identification {
            display: none;
          }

          .summary {
            font-size: 16px;
            margin-top: 20px;
            color: rgba(43,50,69,.87);
          }
          
          .stage_date {
            font-size: 12px;
            padding-bottom: 10px;
          }

          .stage_summary {
            color: #A4A9B4;
            font-size: 12px;
          }
        `}
      </style>
      <div className='bill_header'>
        <div className='date'>
          {withNewestStage(stages, (stage) => (
            <p className='stage_date' >{moment(stage[0].stageDate).format('DD/MM/YYYY')}</p>
          ))}
        </div>
        <div className='title'>
          <h1>
            {/* This function doesn't render anything,
                check if is the spected behavior */}
            {/* {withNewestStage(stages, (stage) => (
              <span className='stage_identification' >{stage[0].identification}</span>
            ))} */}
            {title}
          </h1>
        </div>
        <p className='summary'>{summary}</p>
        {/*
          COMMENT FUTURE LOGIC FOR RENDER STAGE
          <h3>
            {withNewestStage(stages, (stage) => (
              <span>{stage.date}</span>
            ))}
          </h3>
          */}
        <p className='stage_summary'>Cámara de Diputados</p>
      </div>
    </a>
  </BillLink>
)

export default BillCard
