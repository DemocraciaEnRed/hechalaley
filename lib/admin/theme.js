import { fade } from 'material-ui/utils/colorManipulator'

export default {
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
    primary1Color: '#404659',
    primary2Color: fade('#404659', 0.8),
    primary3Color: '#333',
    accent1Color: '#FD5177',
    accent2Color: '#F5F5F5',
    accent3Color: '#9E9E9E',
    textColor: '#2b3245',
    secondaryTextColor: fade('#2b3245', 0.54),
    alternateTextColor: '#f6fafd',
    canvasColor: '#f6fafd',
    borderColor: '#E0E0E0',
    disabledColor: fade('#2b3245', 0.3),
    pickerHeaderColor: '#404659',
    clockCircleColor: fade('#2b3245', 0.07),
    shadowColor: '#000'
  }
}
