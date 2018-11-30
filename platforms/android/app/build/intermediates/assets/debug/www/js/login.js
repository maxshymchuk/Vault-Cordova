class Login {
  constructor() {
    StatusBar.hide();

    this.login = document.createElement('div');
    this.login.setAttribute('class', 'login');

    this.button = document.createElement('div');
    this.button.setAttribute('class', 'button');

    this.image = document.createElement('img');
    this.image.src = 'img/fingerprint.svg';

    this.login.appendChild(this.button);
    this.button.appendChild(this.image);

    this.login.addEventListener('click', this.checkFinger.bind(this));

    container.appendChild(this.login);

    // DEBUGGING
    // this.show();
  }

  checkFinger() {
    Fingerprint.show({
      clientId: "client",
      clientSecret: "password"
    }, () => {
      StatusBar.show();
      vault.remove(this.login);
      vault.login();
    });
  }

  show() {
    // DEBUGGING
    vault.remove(this.login);
    vault.login();
  }

}