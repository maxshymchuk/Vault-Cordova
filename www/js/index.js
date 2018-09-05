const menu = new Menu();
const login = new Login();
const addMenu = new AddMenu();
const options = new Options();

// browser local storage
let storage = window.localStorage;

// Vault exemplar
let vault; 

// object of {note, pass}
let list;

// array of checked elements
let checked = [];

class Vault {
  constructor(password) {
    this.isLogin = false;
    this.password = password;       
  }

  clearList() {
    document.getElementById('content').innerHTML = '';
  }

  loadData(key) {
    // this.clearList();
    let str = '';
    str += `
        <div class="item" id="item${key.replace('item', '')}">
          <div class="checkbox"></div>
          <div class="note">
            ${list[key].note}
          </div>
          <div class="pass">
          </div>
          <div class="copy"></div>
        </div>`;
    const content = document.getElementById('content');
    content.insertAdjacentHTML('beforeEnd', str);
  }

  login(password) {
    if (password == this.password) {
      this.isLogin = true;
      for (let key in list) {
        vault.loadData(key);
      }
    } else {
      this.isLogin = false;
    }    
    this.update();
  }

  logout() {
    this.isLogin = false; 
    this.clearList();
    this.update();
  }
  
  update() {
    const content = document.getElementById('content');
    if (this.isLogin) {
      login.hide();
      menu.show();
      content.style.opacity = '1';
      content.style.visibility = 'visible';     
    } else {
      login.show();
      menu.hide();
      content.style.opacity = '0';
      content.style.visibility = 'hidden';
    }
  }
}

const app = {
  initialize() {
    // storage.clear();
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    list = {};
    for (let i = 0; i < storage.length; i++) {
      list[storage.key(i)] = JSON.parse(storage.getItem(storage.key(i)));
    }
    vault = new Vault('');
    vault.update();
    addMenu.hide();
  },

  onDeviceReady() {
    
  }
};

app.initialize();

document.onclick = function(event) {
  event = event || window.event;
  if (!event.target) {
    event.target = event.srcElement;
  }
  const elem = event.target;
  // hide add_menu when losing focus (JUST KOSTYL)
  if (addMenu.isShown && elem.parentNode.className != 'notification' && elem.className != 'add_button') {
    addMenu.hide();
  }
  // hide options when losing focus (JUST KOSTYL)
  if (options.isShown && elem.parentNode.id != 'options' && elem.className != 'settings_button') {
    options.hide();
  }

  if (elem.parentNode.className == 'item') {
    switch (elem.className) {
      case 'checkbox':
        if (checked.indexOf(elem.parentNode.id) == -1) {
          checked.push(elem.parentNode.id);
          elem.style.backgroundColor = 'rgb(0, 0, 255)';
        } else {
          checked.splice(checked.indexOf(elem.parentNode.id), 1);
          elem.style.backgroundColor = '#DDD';
        }
        break;
      case 'pass':
        if (elem.innerText == '') {
          elem.insertAdjacentHTML(
            'beforeEnd', 
            list[elem.parentNode.id].pass
          );
          elem.style.backgroundColor = '#FFF';
        } else {
          elem.innerHTML = '';
          elem.style.backgroundColor = '#DDD';
        }
        break;
      case 'copy':
        cordova.plugins.clipboard.copy(list[elem.parentNode.id].pass);   
        break;
    }
  }
  
}