import Textarea from './autogrow-textarea'

export default (props) => (
  <div>
    <p>
      <small>
        <strong>Markdown</strong> es el formato base que se utiliza
        para guardar el texto en la base de datos. Aquí puedes editarlo
        directamente, o copiar y pegarlo desde otras fuentes sin
        arruinar los estilos.
      </small>
    </p>
    <Textarea
      style={{
        boxSizing: 'border-box',
        display: 'block',
        width: '100%',
        fontFamily: 'monospace',
        fontSize: '1.1rem',
        lineHeight: 1.6,
        resize: 'vertical',
        padding: '1rem',
        height: 500,
        border: '1px solid rgba(0, 0, 0, .2)'
      }}
      {...props}
    />
  </div>
)
