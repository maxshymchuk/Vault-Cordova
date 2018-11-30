class AddMenu {
  constructor() {
    // list = {button_id: function, ...};
    this.list = {};

    this.list = {
      'add_menu_submit': () => {
        this.add();
      }
    };

    this.addMenuLayer = document.createElement('div');
    this.addMenuLayer.setAttribute('id', 'add_menu_layer');

    this.addMenu = document.createElement('div');
    this.addMenu.setAttribute('id', 'add_menu');

    this.inputGroup = document.createElement('div');
    this.inputGroup.setAttribute('class', 'input_group');

    this.note = document.createElement('input');
    this.note.setAttribute('type', 'text');
    this.note.setAttribute('placeholder', 'note');

    this.pass = document.createElement('input');
    this.pass.setAttribute('type', 'text');
    this.pass.setAttribute('placeholder', 'pass');

    this.inputGroup.appendChild(this.note);
    this.inputGroup.appendChild(this.pass);

    this.submit = document.createElement('button');
    this.submit.setAttribute('id', 'add_menu_submit');
    this.submit.innerText = 'OK';
    
    this.addMenuLayer.appendChild(this.addMenu);
    this.addMenu.appendChild(this.inputGroup);
    this.addMenu.appendChild(this.submit);
    
    container.appendChild(this.addMenuLayer);

    this.addMenuLayer.addEventListener('click', this.onClick.bind(this));
  }

  onClick() {
    const target = event.target;
    switch (target.id) {
      case 'add_menu_layer':
      case 'add_menu':  
        vault.remove(this.addMenuLayer);
        break;
      case 'add_menu_submit':
        if (this.list != null) {
          try {
            this.list[target.id]();
            content.hideHelp();
          } catch {}  
        }
        break;
    }
  }

  add() {
    const note = this.note.value;
    const pass = this.pass.value;
    if (note == '' || pass == '') {
      return;
    }
    const key = `item${Object.keys(content.items).length}`;
    content.items[key] = {
      note: note,
      pass: pass
    };
    storage.setItem(key, JSON.stringify(content.items[key]));
    new Item(key);
    vault.remove(this.addMenuLayer);
  }
}