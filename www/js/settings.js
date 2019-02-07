class Settings {
  constructor() {
    // controlsList = {button_id: function, ...};
    this.controlsList = {};
    // recordsList = order of records
    this.recordsList = [];

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

    this.recordsList.push(this.record1);

    // record 2
    this.record2 = document.createElement('div');
    this.record2.setAttribute('class', 'record');

    this.section = document.createElement('div');
    this.section.setAttribute('class', 'record_section');

    this.record2_button1 = document.createElement('button');
    this.record2_button1.setAttribute('class', 'record_button erase warning');
    this.record2_button1.addEventListener('click', this.erase.bind(this));

    this.record2_button2 = document.createElement('button');
    this.record2_button2.setAttribute('class', 'record_button sync');
    this.record2_button2.addEventListener('click', this.sync.bind(this));

    this.section.appendChild(this.record2_button2);
    this.section.appendChild(this.record2_button1);
    
    this.record2.appendChild(this.section);

    this.recordsList.push(this.record2);

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
    this.recordsList.forEach(r => {
      this.records.appendChild(r);
    })
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
    if (confirm('It will erase all your data and restore default settings.\nAre you sure?')) {
      navigator.vibrate(500);
      storage.clear();
      vault.remove(this.settingsLayer);
      vault.logout();
    }
  }

  sync() {
    alert('it\'s not ready for release, bitch');
  }

}