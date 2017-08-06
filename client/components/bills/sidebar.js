import Link from 'next/link'

const Sidebar = ({ stages }) => {
  return (
    <div className='sidebar'>
      <style jsx>{`
        .sidebar {
          position: relative;
        }

        .logo {
          width: 100%;
        }
      `}</style>
      <Link href='/'>
        <a>
          <img
            src='/static/logo-white.png'
            alt='Hecha la Ley'
            className='logo' />
        </a>
      </Link>
    </div>
  )
}

export default Sidebar
