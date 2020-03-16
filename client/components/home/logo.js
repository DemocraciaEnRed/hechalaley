export default () => (
  <div>
    <style jsx>
      {`
        .logo {
          max-width: 380px;
          margin-bottom: 20px;
        }

        @media screen  and (max-width: 480px) {
          .logo {
            max-width: 256px;
            margin-bottom: 10px;
          }
        }
      `}
    </style>
    <img src='/static/logo.png' alt='Hecha la Ley' className='logo' />
  </div>
)
