import Card from '../card'

const BillCard = ({
  title,
  summary,
  url,
  currentStage = {}
}) => (
  <Card href={url}>
    <style jsx>{`
      .title {
        flex-grow: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 35px;
      }

      .title h1 {
        color: #2b3245;
        display: block;
        font-size: 27px;
        font-weight: 700;
        line-height: 1;
        text-transform: uppercase;
        text-align: center;
      }

      .title span {
        color: #808080;
        display: block;
        font-size: 13px;
        font-weight: 400;
        line-height: .5;
        text-align: center;
        margin-bottom: 13px;
      }

      .summary {
        padding: 35px;
        border-top: 1px solid #e0e0e0;
        background-color: #eef1f6;
      }

      .summary p {
        font-size: .9em;
        color: rgba(43,50,69,.87);
      }
    `}</style>
    <div className='title'>
      <h1>
        {currentStage.identification && (
          <span>{currentStage.identification}</span>
        )}
        {title}
      </h1>
    </div>
    <div className='summary'>
      <p>{summary}</p>
    </div>
  </Card>
)

export default BillCard
