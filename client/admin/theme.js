import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  spacing: {
    iconSize: 18,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56
  },
  fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
  borderRadius: 0,
  palette: {
    primary: {
      light: '#ff79b0',
      main: '#ff4081',
      dark: '#c60055',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#4f5b62',
      main: '#404657',
      dark: '#000a12',
      contrastText: '#ffffff'
    },
    error: {
      main: '#D50000'
    }
  }
})
