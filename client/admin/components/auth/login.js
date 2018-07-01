import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userLogin } from 'react-admin'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { doLogin } from '../../auth-provider'
import theme from '../../theme'

const styles = (theme) => ({
  main: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '15vh',
    minHeight: '100vh',
    height: '1px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default
  },
  card: {
    maxWidth: 300,
    width: '100%'
  },
  logo: {
    height: 0,
    paddingTop: '110px',
    backgroundSize: '150px',
    backgroundColor: '#404657'
  },
  input: {
    width: '100%'
  },
  button: {
    width: '100%'
  }
})

class LoginPage extends Component {
  state = {
    email: '',
    isLoading: false
  }

  handleChange = (name) => (evt) => {
    this.setState({
      [name]: evt.target.value
    })
  }

  submit = async (evt) => {
    evt.preventDefault()

    this.setState({
      error: '',
      isLoading: true,
      success: false
    })

    const { email } = this.state

    try {
      await doLogin({ email })
      this.setState({ isLoading: false, success: true })
    } catch (err) {
      console.log(err)
      if (err.status === 403) {
        this.setState({
          isLoading: false,
          error: 'No te encuentras autorizado'
        })

        return
      }

      console.error(err)
      this.setState({
        isLoading: false,
        error: 'Se produjo un error, por favor intentalo más tarde.'
      })
    }
  }

  render () {
    const { classes } = this.props
    const { isLoading, error, success } = this.state

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.main}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.logo}
              image='/static/logo-white.png'
              title='Admin - Hecha la Ley'
            />
            {success && (
              <CardContent>
                <br />
                <Typography align='center' component='p' paragraph>
                  Te enviamos un mail a <strong>{this.state.email}</strong>
                </Typography>
                <Typography align='center' component='p' paragraph>
                  Entra al admin utilizando el link que se encuentra dentro.
                </Typography>
              </CardContent>
            )}
            {!success && (
              <form onSubmit={this.submit}>
                <CardContent>
                  {error && (
                    <Typography
                      align='center'
                      component='p'
                      color='error'
                      paragraph
                    >
                      {error}
                    </Typography>
                  )}
                  <TextField
                    name='email'
                    type='email'
                    label='Email'
                    className={classes.input}
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin='normal'
                    autoFocus
                    required
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size='large'
                    type='submit'
                    color='primary'
                    disabled={isLoading}
                    className={classes.button}
                  >
                    {isLoading && <CircularProgress size={25} thickness={2} />}
                    Login
                  </Button>
                </CardActions>
              </form>
            )}
          </Card>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(undefined, { userLogin })(withStyles(styles)(LoginPage))

// /* eslint-disable import/no-extraneous-dependencies, react/forbid-prop-types */

// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { propTypes, reduxForm, Field } from 'redux-form'
// import { connect } from 'react-redux'
// import compose from 'recompose/compose'

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import { Card, CardActions } from 'material-ui/Card'
// import Avatar from 'material-ui/Avatar'
// import RaisedButton from 'material-ui/RaisedButton'
// import TextField from 'material-ui/TextField'
// import CircularProgress from 'material-ui/CircularProgress'
// import LockIcon from '@material-ui/icons/action/lock-outline'

// import {
//   userLogin,
//   translate,
//   Notification,
//   showNotification
// } from 'react-admin'

// const { Request, Headers } = window

// const styles = {
//   main: {
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: '100vh',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   card: {
//     minWidth: 300
//   },
//   avatar: {
//     margin: '1em',
//     textAlign: 'center '
//   },
//   form: {
//     padding: '0 1em 1em 1em'
//   },
//   input: {
//     display: 'flex'
//   }
// }

// function getColorsFromTheme (theme) {
//   const {
//     palette: {
//       primary1Color,
//       accent1Color
//     }
//   } = theme

//   return { primary1Color, accent1Color }
// }

// // see http://redux-form.com/6.4.3/examples/material-ui/
// const renderInput = ({ meta: { touched, error } = {}, input: { ...inputProps }, ...props }) =>
//   (<TextField
//     errorText={touched && error}
//     {...inputProps}
//     {...props}
//     fullWidth
//   />)

// class Login extends Component {
//   login = (auth) => {
//     const req = new Request('/api/auth/login', {
//       credentials: 'same-origin',
//       method: 'POST',
//       body: JSON.stringify(auth),
//       headers: new Headers({ 'Content-Type': 'application/json' })
//     })

//     fetch(req)
//       .then((res) => {
//         if (res.status < 200 || res.status >= 300) {
//           const err = new Error(res.statusText)
//           err.response = res
//           throw err
//         }

//         return res.json()
//       })
//       .then(({ code }) => {
//         if (code === 'TOKEN_SENDED') {
//           this.props.showNotification('Te acabamos de enviar un link a tu email para ingresar.')
//           return
//         }

//         throw new Error('Invalid token')
//       })
//       .catch((err) => {
//         if (err.response && err.response.status === 403) {
//           this.props.showNotification('No te encuentras autorizado.', 'warning')
//         } else {
//           console.log(err)
//           this.props.showNotification('Lo sentimos, hubo un error, intenta más tarde por favor.', 'warning')
//         }
//       })
//   }

//   render () {
//     const { handleSubmit, isLoading, theme, translate } = this.props
//     const muiTheme = getMuiTheme(theme)
//     const { primary1Color, accent1Color } = getColorsFromTheme(muiTheme)

//     return (
//       <MuiThemeProvider muiTheme={muiTheme}>
//         <div style={{ ...styles.main, backgroundColor: primary1Color }}>
//           <Card style={styles.card}>
//             <div style={styles.avatar}>
//               <Avatar backgroundColor={accent1Color} icon={<LockIcon />} size={60} />
//             </div>
//             <form onSubmit={handleSubmit(this.login)}>
//               <div style={styles.form}>
//                 <div style={styles.input} >
//                   <Field
//                     name='email'
//                     component={renderInput}
//                     floatingLabelText='Email'
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>
//               <CardActions>
//                 <RaisedButton
//                   type='submit'
//                   primary
//                   disabled={isLoading}
//                   icon={isLoading && <CircularProgress size={25} thickness={2} />}
//                   label={translate('ra.auth.sign_in')}
//                   fullWidth
//                 />
//               </CardActions>
//               <Notification />
//             </form>
//           </Card>
//         </div>
//       </MuiThemeProvider>
//     )
//   }
// }

// Login.propTypes = {
//   ...propTypes,
//   authClient: PropTypes.func.isRequired,
//   previousRoute: PropTypes.string.isRequired,
//   theme: PropTypes.any.isRequired,
//   translate: PropTypes.func.isRequired,
//   userLogin: PropTypes.func.isRequired
// }

// const mapStateToProps = (state) => ({ isLoading: state.admin.loading > 0 })

// const enhance = compose(
//   translate,
//   reduxForm({
//     form: 'signIn',
//     validate: (values, props) => {
//       const errors = {}
//       const { translate } = props

//       if (!values.email) errors.email = translate('ra.validation.required')

//       return errors
//     }
//   }),
//   connect(mapStateToProps, { userLogin, showNotification }),
// )

// export default enhance(Login)
