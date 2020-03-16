import { Component } from 'react'

class Menu extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showMenu: false
    }
  }

  handleOnClick = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  render () {
    const { children } = this.props
    return (
      <div className='menu'>
        <style jsx>
          {`
        .menu {
          padding-bottom: 200px;
        }
        .menu-mobile {
          display: none;
        }

        @media screen and (max-width: 480px) {
          .menu {
            padding-bottom: 60px;
          }
          .menu-mobile {
            display: block;
            font-size: 20px;
            font-weigth: 600;
          }
          .menu-item {
            display: none;
          }

          .menu-item.show {
            display: flex;
            flex-direction: column;
            position: absolute;
            z-index: 1000;
            width: 100%;
            background-color: #f6fafd;
            padding: 10px 0;
          }
        }
      `}
        </style>
        <div className='menu-mobile' onClick={() => this.handleOnClick()}>
          Menu
        </div>
        <div className={`menu-item ${this.state.showMenu ? 'show' : ''}`}>
          { children }
        </div>
      </div>
    )
  }
}

export default Menu
