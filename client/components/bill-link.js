import Link from 'next/link'

const BillLink = ({ id, children, ...props }) => (
  <Link href={`/bills?id=${id}`} as={`/bills/${id}`} {...props}>
    {children}
  </Link>
)

export default BillLink
