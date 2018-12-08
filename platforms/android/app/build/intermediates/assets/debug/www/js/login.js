class Login {
  constructor() {
    StatusBar.hide();

    // setup standart password
    if (!storage.getItem('password')) {
      storage.setItem('password', 'pass');
    }

    this.login = document.createElement('div');
    this.login.setAttribute('class', 'login');

    this.button = document.createElement('div');
    this.button.setAttribute('class', 'button');

    this.image = document.createElement('img');
    this.image.src = 'img/fingerprint.svg';

    this.backup = document.createElement('input');
    this.backup.setAttribute('class', 'backup');
    this.backup.setAttribute('type', 'password');
    this.backup.setAttribute('onfocus', 'this.value=""');

    this.backup.addEventListener('keyup', this.checkPassword.bind(this))

    this.login.appendChild(this.button);
    this.button.appendChild(this.image);

    this.login.addEventListener('click', this.checkFinger.bind(this));

    Fingerprint.isAvailable(() => {
      container.appendChild(this.login);
    }, () => {
      container.appendChild(this.backup);
    });

    // container.appendChild(this.backup);
    // DEBUGGING
    // this.show();
  }

  checkFinger() {
    Fingerprint.show({
      clientId: "client",
      clientSecret: "password",
      disableBackup: true
    }, () => {
      StatusBar.show();
      vault.remove(this.login);
      vault.login();
    });
  }

  checkPassword() {
    const password = storage.getItem('password');
    if (this.backup.value == password) {
      StatusBar.show();
      vault.remove(this.backup);
      vault.login();
    }
  }

  // DEBUGGING
  show() {
    vault.remove(this.backup);
    vault.login();
  }

}