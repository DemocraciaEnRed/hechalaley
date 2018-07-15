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
