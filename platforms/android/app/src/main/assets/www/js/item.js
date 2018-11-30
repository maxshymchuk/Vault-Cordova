class Item {
  constructor(record) {
    this.item = document.createElement('div');
    this.item.setAttribute('class', 'item');
    this.item.setAttribute('id', record);

    this.checkbox = document.createElement('div');
    this.checkbox.setAttribute('class', 'checkbox');

    this.CHECKBOX_UNCHECKED_COLOR = '#DDDDDD';
    this.CHECKBOX_CHECKED_COLOR = '#FF0000';

    this.note = document.createElement('div');
    this.note.setAttribute('class', 'note');
    content != null && (this.note.innerText = content.items[record].note);

    this.pass = document.createElement('div');
    this.pass.setAttribute('class', 'pass');

    this.PASS_OPENED_COLOR = 'transparent';
    this.PASS_CLOSED_COLOR = '#DDDDDD';

    this.copy = document.createElement('div');
    this.copy.setAttribute('class', 'copy');

    this.item.appendChild(this.checkbox);
    this.item.appendChild(this.note);
    this.item.appendChild(this.pass);
    this.item.appendChild(this.copy);

    document.getElementById('content').appendChild(this.item);

    this.item.addEventListener('click', this.onClick.bind(this));
  }

  onClick() {
    const target = event.target;
    switch (target) {

      case this.checkbox:
        const pos = checked.indexOf(this.item);
        if (pos != -1) {
          checked.splice(pos, 1);
          this.item.style.borderColor = this.CHECKBOX_UNCHECKED_COLOR;
          this.checkbox.style.backgroundColor = this.CHECKBOX_UNCHECKED_COLOR;
          if (!checked.length) {
            delete menu.list.delete_button;
            menu.update();
          }
        } else {
          checked.push(this.item);
          this.item.style.borderColor = this.CHECKBOX_CHECKED_COLOR;
          this.checkbox.style.backgroundColor = this.CHECKBOX_CHECKED_COLOR;
          menu.list.delete_button = () => {
            for (let i = 0; i < checked.length; i++) {
              vault.remove(checked[i]);
              storage.removeItem(checked[i].id);
              delete menu.list.delete_button;
              delete content.items[checked[i].id];
              JSON.stringify(content.items) == '{}' && content.showHelp();
              menu.update();
            }
            checked = [];
          }
          checked.length == 1 && menu.update();
        }
        break;

      case this.pass:
        if (this.pass.innerText == '') {
          this.pass.innerText = content.items[this.pass.parentNode.id].pass;
          this.pass.style.backgroundColor = this.PASS_OPENED_COLOR;
        } else {
          this.pass.innerText = '';
          this.pass.style.backgroundColor = this.PASS_CLOSED_COLOR;
        }
        break;

      case this.copy: 
        cordova.plugins.clipboard.copy(content.items[this.pass.parentNode.id].pass);
        navigator.vibrate(50);
        // const flash = document.createElement('div');
        // flash.setAttribute('id', 'flash');
        // container.appendChild(flash);
        // flash.addEventListener("animationend", () => {
        //   vault.remove(flash);
        // });
        break;
    }
  }
}