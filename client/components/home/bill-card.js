import printDate from '../../helpers/print-date'
import BillLink from '../bill-link'

const withNewestStage = (stages = [], cb) =>
  (stages.length > 0 ? cb(stages[0]) : null)

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
            min-height: 275px;
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
            font-size: 16px;
            padding-bottom: 10px;
          }

          .stage_chamber {
            color: #A4A9B4;
            font-size: 16px;
            padding-left: 20px;
            margin-bottom: 16px;
          }

          .bill_footer {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
          }

          .bill_footer__current_stage {
            text-align: center;
            background-color: #e0e0e0;
            color: #2b3245;
            font-size: 16px;
            padding: 10px 0;
          }
        `}
      </style>
      <div className='bill_header'>
        <div className='date'>
          {withNewestStage(stages, ({ stageDate }) => (
            <p className='stage_date' >{printDate(stageDate)}</p>
          ))}
        </div>
        <div className='title'>
          <h1>
            {/* This function doesn't render anything,
                check if is the spected behavior */}
            {/* {withNewestStage(stages, (stage) => (
              <span className='stage_identification' >{stage.identification}</span>
            ))} */}
            {title}
          </h1>
        </div>
        <p className='summary'>{summary}</p>
      </div>
      <div className='bill_footer'>
        {/* TO DO: The API doesn't return the stage chamber */}
        <p className='stage_chamber'>Cámara de Diputados</p>
        <div className='bill_footer__current_stage'>
          <p>Paso por comisión de salud y esa</p>
        </div>
      </div>
    </a>
  </BillLink>
)

export default BillCard
