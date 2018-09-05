class Menu {
  constructor() {
    this.isShown = false;

    this.menu = document.createElement('div');
    this.menu.setAttribute('id', 'menu');

    // menu buttons
    this.appendChilds([
      this.createButton('add_button', 'addMenu.show()'),
      this.createButton('settings_button', 'options.show()'),
      this.createButton('lock_button', 'vault.logout()')
    ]);

    document.body.appendChild(this.menu);

    // width of each menu element
    const nodes = document.getElementById('menu').getElementsByTagName('div');
    for(let i = 0; i < nodes.length; i++) {
      nodes[i].style.width = `${100 / nodes.length}%`;
    }
  }

  // args = [elem, elem, ...]
  appendChilds(args) {
    for (let i = 0; i < args.length; i++) {
      this.menu.appendChild(args[i]);
    }
  }

  createButton(className, action) {
    const button = document.createElement('div');
    button.setAttribute('class', className);
    button.setAttribute('onclick', action);
    return button;
  }

  show() {
    this.isShown = true;
    this.menu.style.visibility = 'visible';
    this.menu.style.height = '40px';
  }

  hide() {
    this.isShown = false;
    this.menu.style.visibility = 'hidden';
    this.menu.style.height = '0';
  }
}