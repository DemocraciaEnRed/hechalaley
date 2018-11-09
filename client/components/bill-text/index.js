import Text from './text'

export const BillText = ({ text }) => <Text text={text} />

export const BillTextCompare = ({ text, diff = null }) => (
  <div className='bill-text-compare'>
    <style jsx>
      {`
        .bill-text-compare {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 0 15px;
        }
      `}
    </style>
    <Text hide='ins' text={text} />
    {diff && <Text hide='del' text={text} />}
    {!diff && (
      <div className='select-stage'>Etapa sin seleccionar</div>
    )}
  </div>
)
