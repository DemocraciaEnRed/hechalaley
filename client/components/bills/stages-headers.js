import Header from './header'

export default ({ stages }) => (
  <div className='stages-headers'>
    <style jsx>
      {`
        .stages-headers {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 0 30px;
          position: relative;
          padding-top: 25px;
        }

        .stages-headers::after {
          content: ' ';
          position: absolute;
          left: 50%;
          top: 20%;
          width: 1px;
          height: 80%;
          background-color: #e0e0e0;
        }

        .no-stage-selected {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex-wrap: wrap;
          align-items: center;
          padding: 30px 15px;
          border: 25px solid white;
          background-color: #fbfbfb;
        }

        .no-stage-selected p {
          color: #2b3245;
          width: 250px;
          text-align: center;
          font-size: 22px;
        }

        .no-stage-selected img {
          width: 44px;
          margin-bottom: 20px;
        }
      `}
    </style>
    {stages.map((stage) => <Header stage={stage} />)}
    {stages.length === 1 && (
      <div className='no-stage-selected'>
        <img src='/static/tap-ico.svg' alt='' />
        <p>Seleccioná una etapa para comparar cambios</p>
      </div>
    )}
  </div>
)
