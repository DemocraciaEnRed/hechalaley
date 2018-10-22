import Button from './button'
import Logo from './logo'

export default () => (
  <div className='cover'>
    <style jsx>
      {`
        .cover {
          position: relative;
          padding: 200px 0;
        }
        p {
          max-width: 580px;
          width: 100%;
          line-height: 28px;
          font-size: 21px;
          color: rgba(43, 50, 69, 0.87);
          padding: 30px 0 30px;
        }
        p:first-of-type {
          padding-bottom: 0;
        }
        .line {
          position: absolute;
          left: -25px;
          top: 310px;
          display: block;
          height: 150px;
          width: 2px;
          background-color: rgba(43, 50, 69, 0.87);
        }
      `}
    </style>
    <Logo />
    <span className='line' />
    <p>
      Hecha la ley es un sitio que sigue los proyectos de ley dentro del congreso.
    </p>
    <p>
      Examiná el trabajo legislativo de una manera clara y sencilla.
    </p>
    <Logo />
    <Button title='Ver proyectos de ley' />
  </div>
)
