const Text = ({ text }) => (
  <div className='bills-content bills-text'>
    <style global jsx>
      {`
        .bills-text del {
          text-decoration: line-through;
          background-color: rgba(251, 65, 106, .50);
        }

        .bills-text ins {
          text-decoration: none;
          background-color: rgba(102, 235, 154, .50);
        }

        .bills-text h1,
        .bills-text h2,
        .bills-text h3,
        .bills-text h4 {
          font-weight: 700;
          margin: 0;
          letter-spacing: .03rem;
          line-height: 1.3;
        }

        .bills-text h1 {
          font-size: 1.7rem;
          margin-bottom: 30px;
        }

        .bills-text h2 {
          font-size: 1.5rem;
          margin-bottom: 15px;
        }

        .bills-text h3 {
          font-size: 1.1rem;
          margin-bottom: 10px;
        }

        .bills-text h4 {
          font-size: 1.1rem;
          margin-bottom: 10px;
          font-weight: 400;
        }

        .bills-text p + h1,
        .bills-text p + h2,
        .bills-text p + h3,
        .bills-text p + h4 {
          margin-top: 30px;
        }

        .bills-text p {
          text-align: justify;
        }

        .bills-text h1,
        .bills-text h2,
        .bills-text h3,
        .bills-text p {
          position: relative;
          hyphens: auto;
        }

        .bills-text .anchor {
          position: absolute;
          top: 0;
          right: calc(100% + 8px);
          height: 100%;
          opacity: 0;
        }

        .bills-text .anchor > svg {
          position: absolute;
          top: calc(50% - 13px);
          right: 100%;
        }

        .bills-text h1:hover .anchor,
        .bills-text h2:hover .anchor,
        .bills-text h3:hover .anchor {
          opacity: 1;
        }
      `}
    </style>
    <div dangerouslySetInnerHTML={{ __html: text }} />
  </div>
)

export default Text
