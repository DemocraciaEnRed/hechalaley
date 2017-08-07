const Text = ({ text }) => (
  <div className='bills-content'>
    <style jsx>{`
      :global(h1),
      :global(h2),
      :global(h3),
      :global(p) {
        position: relative;
        hyphens: auto;
      }

      :global(.anchor) {
        position: absolute;
        top: 0;
        right: calc(100% + 8px);
        height: 100%;
        opacity: 0;
      }

      :global(.anchor > svg) {
        position: absolute;
        top: calc(50% - 13px);
        right: 100%;
      }

      :global(h1:hover .anchor),
      :global(h2:hover .anchor),
      :global(h3:hover .anchor) {
        opacity: 1;
      }
    `}</style>
    <div dangerouslySetInnerHTML={{ __html: text }} />
  </div>
)

export default Text
