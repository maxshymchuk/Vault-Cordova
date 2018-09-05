class AddMenu {
  constructor() {
    this.isShown = false;
    this.menu = this.createElement('div', [
      {
        name: 'id',
        value: 'add'
      },
      {
        name: 'class',
        value: 'notification'
      }
    ]);

    this.title = document.createElement('div');
    this.title.setAttribute('class', 'title');
    this.title.innerText = 'new record';

    this.note = this.createElement('input', [
      {
        name: 'type',
        value: 'text'
      },
      {
        name: 'id',
        value: 'add_note'
      },
      {
        name: 'placeholder',
        value: '> note'
      }
    ]);

    this.pass = this.createElement('input', [
      {
        name: 'type',
        value: 'text'
      },
      {
        name: 'id',
        value: 'add_pass'
      },
      {
        name: 'placeholder',
        value: '> pass'
      }
    ]);

    this.submit = this.createElement('input', [
      {
        name: 'type',
        value: 'submit'
      },
      {
        name: 'id',
        value: 'add_submit'
      },
      {
        name: 'value',
        value: '> add record'
      },
      {
        name: 'onclick',
        value: 'addMenu.addElem()'
      }
    ]); 
    
    this.menu.appendChild(this.title);
    this.menu.appendChild(this.note);
    this.menu.appendChild(this.pass);
    this.menu.appendChild(this.submit);
    
    document.getElementById('container').appendChild(this.menu);
  }

  // arg = [ {name, value}, {}, {}, ... ];
  createElement(elemName, arg) {
    const elem = document.createElement(elemName);
    for (let i = 0; i < arg.length; i++) {
      elem.setAttribute(arg[i].name, arg[i].value);
    }
    return elem;
  }

  addElem() {
    const note = this.note.value;
    const pass = this.pass.value;
    if (note == '' || pass == '') {
      return;
    }
    const key = `item${Object.keys(list).length}`;
    list[key] = {
      note: note,
      pass: pass
    };
    storage.setItem(key, JSON.stringify(list[key]));
    vault.loadData(key);
    this.hide();
  }

  show() {
    this.isShown = true;
    this.menu.style.transform = 'translateX(0) translateY(-50%)';
    this.menu.style.visibility = 'visible';
  }

  hide() {
    this.isShown = false;
    this.menu.style.visibility = 'hidden';
    this.menu.style.transform = 'translateX(-150%) translateY(-50%)';
    this.note.value = '';
    this.pass.value = '';
  }
}