class Menu {
  constructor() {
    // list = {button_id: function, ...};
    this.list = {};

    this.list = {
      'add_button': () => {
        addMenu = new AddMenu();
      },
      'settings_button': () => {
        settings = new Settings();
      },
      'lock_button': () => {
        vault.logout();
      }
    };

    this.menu = document.createElement('div');
    this.menu.setAttribute('id', 'menu');

    this.update();
    
    container.appendChild(this.menu);

    this.menu.addEventListener('click', this.onClick.bind(this));
  }

  onClick() {
    const target = event.target;
    if (this.list != null) {
      try {
        this.list[target.id]();
      } catch {}  
    }
  }

  update() {
    this.menu.innerHTML = '';
    Object.keys(this.list).forEach((element) => {
      const button = document.createElement('button');
      button.setAttribute('id', element);
      this.menu.appendChild(button);
    })
  }
}