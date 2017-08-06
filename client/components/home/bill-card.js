import BillLink from '../bill-link'

const BillCard = ({
  id,
  title,
  summary,
  url,
  currentStage = {}
}) => (
  <BillLink id={id}>
    <a className='bill-card'>
      <style jsx>{`
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
    </a>
  </BillLink>
)

export default BillCard
