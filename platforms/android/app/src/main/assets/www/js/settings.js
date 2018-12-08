class Settings {
  constructor() {
    // controlsList = {button_id: function, ...};
    this.controlsList = {};

    this.controlsList = {
      'settings_submit': () => {
        this.submit();
      },
      'settings_close': () => {
        this.close();
      }
    }

    this.settingsLayer = document.createElement('div');
    this.settingsLayer.setAttribute('id', 'settings_layer');

    this.settings = document.createElement('div');
    this.settings.setAttribute('id', 'settings');

    this.records = document.createElement('div');
    this.records.setAttribute('class', 'records');

    // record 1
    this.record1 = document.createElement('div');
    this.record1.setAttribute('class', 'record');

    this.record1_title = document.createElement('div');
    this.record1_title.setAttribute('class', 'record_title');
    this.record1_title.innerText = 'Set new password';

    this.record1_inputGroup = document.createElement('div');
    this.record1_inputGroup.setAttribute('class', 'record_input_group');
    this.record1_input = document.createElement('input');
    this.record1_input.setAttribute('type', 'password');
    this.record1_inputGroup.appendChild(this.record1_input);

    this.record1.appendChild(this.record1_title);
    this.record1.appendChild(this.record1_inputGroup);

    // record 2
    this.record2 = document.createElement('div');
    this.record2.setAttribute('class', 'record');

    this.record2_button = document.createElement('button');
    this.record2_button.setAttribute('class', 'record_button_warning');
    this.record2_button.innerText = 'clear all data & restore settings';
    this.record2_button.addEventListener('click', this.erase.bind(this))

    this.record2.appendChild(this.record2_button);

    // controls
    this.controls = document.createElement('div');
    this.controls.setAttribute('class', 'controls');
    this.submit = document.createElement('button');
    this.submit.setAttribute('id', 'settings_submit');
    this.submit.innerText = 'submit';
    this.close = document.createElement('button');
    this.close.setAttribute('id', 'settings_close');
    this.close.innerText = 'cancel';
    this.controls.appendChild(this.submit);
    this.controls.appendChild(this.close);
    
    // overall
    this.records.appendChild(this.record1);
    this.records.appendChild(this.record2);
    this.settings.appendChild(this.records);
    this.settings.appendChild(this.controls);
    this.settingsLayer.appendChild(this.settings);
    
    container.appendChild(this.settingsLayer);

    this.settings.addEventListener('click', this.onClick.bind(this));
  }

  onClick() {
    const target = event.target;
    switch (target.id) {
      case 'settings_close':
        vault.remove(this.settingsLayer);
        break;
      case 'settings_submit':
        !!this.record1_input.value && storage.setItem('password', this.record1_input.value);
        vault.remove(this.settingsLayer);
        break;
    }
  }

  erase() {
    if (confirm('Are you sure?')) {
      navigator.vibrate(500);
      storage.clear();
      vault.remove(this.settingsLayer);
      vault.logout();
    }
  }

}