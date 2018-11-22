export default ({ className }) => (
  <style global jsx>
    {`
      .${className} del {
        text-decoration: line-through;
        background-color: rgba(251, 65, 106, .50);
      }

      .${className} ins {
        text-decoration: none;
        background-color: rgba(102, 235, 154, .50);
      }

      .${className} h1,
      .${className} h2,
      .${className} h3,
      .${className} h4 {
        font-weight: 700;
        margin: 0;
        letter-spacing: .03rem;
        line-height: 1.3;
      }

      .${className} h1 {
        font-size: 1.7rem;
        margin-bottom: 30px;
      }

      .${className} h2 {
        font-size: 1.5rem;
        margin-bottom: 15px;
      }

      .${className} h3 {
        font-size: 1.1rem;
        margin-bottom: 10px;
      }

      .${className} h4 {
        font-size: 1.1rem;
        margin-bottom: 10px;
        font-weight: 400;
      }

      .${className} p + h1,
      .${className} p + h2,
      .${className} p + h3,
      .${className} p + h4 {
        margin-top: 30px;
      }

      .${className} p {
        text-align: justify;
      }

      .${className} h1,
      .${className} h2,
      .${className} h3,
      .${className} p {
        position: relative;
        hyphens: auto;
      }

      .${className} .anchor {
        position: absolute;
        top: 0;
        right: calc(100% + 8px);
        height: 100%;
        opacity: 0;
      }

      .${className} .anchor > svg {
        position: absolute;
        top: calc(50% - 13px);
        right: 100%;
      }

      .${className} h1:hover .anchor,
      .${className} h2:hover .anchor,
      .${className} h3:hover .anchor {
        opacity: 1;
      }
    `}
  </style>
)
