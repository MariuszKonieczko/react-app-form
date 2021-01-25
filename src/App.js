import './App.css';
import { Component } from 'react';

class App extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    accept: false,
    message: '',

    errors: {
      username: false,
      email: false,
      password: false,
      accept: false,
    },
  };

  messages = {
    username_incorrect:
      'Nazwa musi być dłuższa niż 10 znaków i nie może zawierać spacji',
    email_incorrect: 'Brak porawnego adresu email',
    password_incorrect: 'Hasło musi mieć co najmniej 8 znków',
    accept_incorrect: 'Nie potwierdzona zgoda',
  };

  handleChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const validation = this.formvalidation();
    console.log(validation);
    if (validation.correct) {
      this.setState({
        username: '',
        email: '',
        password: '',
        accept: false,
        message: 'Formularz został wysłany',

        errors: {
          username: false,
          email: false,
          password: false,
          accept: false,
        },
      });
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          password: !validation.password,
          accept: !validation.accept,
        },
      });
    }
  };

  formvalidation = () => {
    let username = false;
    let email = false;
    let password = false;
    let accept = false;
    let correct = false;

    if (
      this.state.username.length > 10 &&
      this.state.username.indexOf(' ') === -1
    ) {
      username = true;
    }

    if (this.state.email.indexOf('@') !== -1) {
      email = true;
    }

    if (this.state.password.length >= 8) {
      password = true;
    }

    if (this.state.accept) {
      accept = true;
    }

    if (username && email && password && accept) {
      correct = true;
    }

    return { username, email, password, accept, correct };
  };

  componentDidUpdate() {
    if (this.state.message !== '') {
      setTimeout(() => {
        this.setState({ message: '' });
      }, 3000);
    }
  }
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="input-field">
            <label htmlFor="name">Twoje imię:</label>
            <input
              id="name"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>

          {this.state.errors.username && (
            <span className="error">{this.messages.username_incorrect}</span>
          )}

          <div className="input-field">
            <label htmlFor="email">Twój email:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          {this.state.errors.email && (
            <span className="error">{this.messages.email_incorrect}</span>
          )}

          <div className="input-field">
            <label htmlFor="password">Twoje hasło:</label>
            <input
              id="password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          {this.state.errors.password && (
            <span className="error">{this.messages.password_incorrect}</span>
          )}

          <div className="input_field">
            <label htmlFor="regulations">
              <input
                id="regulations"
                type="checkbox"
                checked={this.state.accept}
                name="accept"
                onChange={this.handleChange}
              />
              Zapoznałem się z regulaminem
            </label>
          </div>

          {this.state.errors.accept && (
            <span className="error">{this.messages.accept_incorrect}</span>
          )}
          <div className="action">
            <button className="btn">Wyślij formularz</button>
          </div>
          {this.state.message && (
            <h3 className="success">{this.state.message}</h3>
          )}
        </form>
      </>
    );
  }
}

export default App;
