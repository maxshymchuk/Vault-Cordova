class Login {
  constructor() {
    this.isShown = false;
    this.login = this.createElement('div', [
      {
        name: 'id',
        value: 'login'
      },
      {
        name: 'class',
        value: 'notification'
      }
    ]);

    this.img = this.createElement('img', [
      {
        name: 'src',
        value: './img/locked.svg'
      }
    ]);

    this.title = document.createElement('div');
    this.title.setAttribute('class', 'title');
    this.title.innerText = 'password?';

    this.memo = this.createElement('input', [
      {
        name: 'type',
        value: 'password'
      },
      {
        name: 'id',
        value: 'memo'
      },
      {
        name: 'autofocus',
        //value: 'memo'
      }
    ]);

    this.submit = this.createElement('input', [
      {
        name: 'type',
        value: 'submit'
      },
      {
        name: 'id',
        value: 'submit_button'
      },
      {
        name: 'value',
        value: '> connect'
      },
      {
        name: 'onclick',
        value: 'vault.login(document.getElementById(\'memo\').value)'
      }
    ]); 

    this.login.appendChild(this.img);
    this.login.appendChild(this.title);
    this.login.appendChild(this.memo);
    this.login.appendChild(this.submit);

    document.getElementById('container').appendChild(this.login);
  }

  // arg = [ {name, value}, {}, {}, ...];
  createElement(elemName, arg) {
    const elem = document.createElement(elemName);
    for (let i = 0; i < arg.length; i++) {
      elem.setAttribute(arg[i].name, arg[i].value);
    }
    return elem;
  }

  show() {
    this.isShown = true;
    this.login.style.visibility = 'visible';
    this.login.style.transform = 'translateY(-50%) scale(1)';
  }

  hide() {
    this.isShown = false;
    this.memo.value = '';
    this.login.style.visibility = 'hidden';
    this.login.style.transform = 'translateY(-50%) scale(0)';
  }
}