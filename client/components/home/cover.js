export default () => (
  <div className='cover'>
    <style jsx>
      {`
        .cover {
          position: relative;
          padding: 25vh 15px 5em;
          min-height: 50vh;
          text-align: center;
        }

        .logo {
          margin: 0 auto 1.2em;
          max-width: 460px;
          width: 100%;
          opacity: .9;
        }

        p {
          margin: 0 auto 20px;
          max-width: 530px;
          width: 100%;
          line-height: 23px;
          font-size: 1.05em;
          letter-spacing: 1px;
          color: rgba(43, 50, 69, 0.87);
        }

        .arrow {
          display: block;
          margin: 20vh auto 0;
          width: 40px;
          height: 30px;
          font-family: 'Georgia', 'Apple Symbols';
          animation: bounce 2s infinite;
          background-size: contain;
          background-repeat: no-repeat;
          background-image: url('/static/icons/down-arrow.svg');
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }

          40% {
            -webkit-transform: translateY(-30px);
            transform: translateY(-30px);
          }

          60% {
            -webkit-transform: translateY(-15px);
            transform: translateY(-15px);
          }
        }
      `}
    </style>
    <img src='/static/logo.png' alt='Hecha la Ley' className='logo' />
    <p>
      Una aplicación para realizar seguimiento a los<br />
      proyectos de ley que se debaten en el Congreso.
      Examiná el trabajo legislativo de una manera clara y sencilla.
    </p>
    <span className='arrow' />
  </div>
)
