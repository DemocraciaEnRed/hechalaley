import Link from 'next/link'

const Button = ({ title, typeOfButton, buttonHref }) => (
  <div>
    <style jsx>
      {`
        button {
          display: block;
          font-size: 16px;
          padding: 11px 35px;
          border-radius: 20px;
          font-weight: 100;
          margin-top: 30px;
          text-align: center;
        }
        .primary {
          background-color: rgba(43, 50, 69, 1);
          box-shadow: 0px 4px 14px rgba(43, 50, 69, 0.39);
          color: #fff;
        }
        .primary:hover {
          cursor: pointer;
          background-color: rgba(43, 50, 69, 0.9);
          box-shadow: 0px 4px 14px rgba(43, 50, 69, 0.2);
          transition: 0.3s ease;
        }
        .secondary {
          display: block;
          border: 1px solid rgba(43, 50, 69, 1);
          color: rgba(43, 50, 69, 1);
        }
        .secondary:hover {
          cursor: pointer;
        }
      `}
    </style>
    {/* Use typeOfButton to make custom styles */}
    <Link href={buttonHref} title='Bill list'><button className={typeOfButton || 'primary'}>{title}</button></Link>
  </div>
)

export default Button
