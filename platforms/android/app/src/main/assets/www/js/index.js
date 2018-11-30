// common parent
const container = document.createElement('container');

// reserved! WARNING!
let vault = null;
let login = null;
let menu = null; 
let addMenu = null; 
let content = null;

const app = {
  initialize() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

    // DEBUGGING
    // document.body.appendChild(container);
    // vault = new Vault();
    // vault.logout();
  },

  onDeviceReady() {
    console.log(navigator.vibrate);
    console.log(StatusBar);

    document.body.appendChild(container);
    vault = new Vault();
    vault.logout();
  }
};

app.initialize();