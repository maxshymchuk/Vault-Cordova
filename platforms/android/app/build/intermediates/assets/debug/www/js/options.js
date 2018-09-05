class Options {
  constructor() {
    this.isShown = false;
    
    this.options = document.createElement('div');
    this.options.setAttribute('id', 'options');

    this.editButton = this.createButton('options_edit', 'alert(\'edit\')');
    this.editButton.innerText = 'Edit';
    this.deleteButton = this.createButton('options_delete', 'options.delete()');
    this.deleteButton.innerText = 'Delete';
    this.settingButton = this.createButton('options_settings', 'alert(\'settings\')');
    this.settingButton.innerText = 'Settings';
    this.aboutButton = this.createButton('options_about', 'alert(\'about\')');
    this.aboutButton.innerText = 'About';

    document.getElementById('container').appendChild(this.options);
  }

  appendChilds(args) {
    for (let i = 0; i < args.length; i++) {
      this.options.appendChild(args[i]);
    }
  }

  createButton(className, action) {
    const button = document.createElement('div');
    button.setAttribute('class', className);
    button.setAttribute('onclick', action);
    return button;
  }

  delete() {
    for (let i = 0; i < checked.length; i++) {
      const elem = document.getElementById(checked[i]);
      storage.removeItem(checked[i]);
      delete list[checked[i]];
      elem.parentNode.removeChild(elem);     
    }
    checked = [];
  }

  show() {
    this.options.innerHTML = '';
    switch (checked.length) {
      case 0:
        this.appendChilds([
          this.settingButton,
          this.aboutButton
        ]);
        break;
      case 1:
        this.appendChilds([
          this.editButton,
          this.settingButton,
          this.deleteButton,
          this.aboutButton
        ]);
        break;
      default:
        this.appendChilds([
          this.settingButton,
          this.deleteButton,
          this.aboutButton
        ]);
    }
    this.isShown = true;
    this.options.style.transform = 'translateY(-50px)';
    this.options.style.visibility = 'visible';   
  }

  hide() {
    this.isShown = false;
    this.options.style.transform = 'translateY(100%)';
    this.options.style.visibility = 'hidden';
  }
}