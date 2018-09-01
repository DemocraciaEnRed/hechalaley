import dynamic from 'next/dynamic'
import Layout from '../components/layout'

const BillTextEditor = dynamic(import('../admin/components/bill-text-editor'), {
  ssr: false,
  loading: () => null
})

const exampleBill = `
# Some Bill Example

This is an example of a bill introduction. This is an example of a bill introduction. This is an example of a bill introduction. This is an example of a bill introduction. This is an example of a bill introduction. This is an example of a bill introduction. This is an example of a bill introduction. This is an example of a bill introduction.

## First Subtitle

### Article 1

Some text describing the bill. Some text describing the bill. Some text describing the bill. Some text describing the bill. Some text describing the bill. Some text describing the bill.

### Article 2

Some text describing the bill. Some text describing the bill. Some text describing the bill. Some text describing the bill. Some text describing the bill. Some text describing the bill.

## Ordered Lists

1. First point
2. Second point
3. Third point

## Unordered Lists

* First point
* Second point
* Third point
`

export default () => (
  <Layout>
    <style jsx>
      {`
        .editor {
          margin: 20px auto 0;
          max-width: 768px;
          width: 100%;
        }
      `}
    </style>
    <div className='editor'>
      <BillTextEditor defaultValue={exampleBill} />
    </div>
  </Layout>
)
