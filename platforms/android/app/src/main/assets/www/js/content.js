// browser local storage
let storage = window.localStorage;

// array of checked elements
let checked = [];

class Content {
  constructor() {
    this.content = document.createElement('div');
    this.content.setAttribute('id', 'content');

    this.help = document.createElement('div');
    this.help.setAttribute('class', 'help');
    this.help.innerText = 'Empty! :(';

    container.appendChild(this.content);
    
    this.items = {};
    for (let i = 0; i < storage.length; i++) {
      this.items[storage.key(i)] = JSON.parse(storage.getItem(storage.key(i)));
    }
  }

  showHelp() {
    this.content.appendChild(this.help);
  }

  hideHelp() {
    vault.remove(this.help);
  }

  fill() {
    JSON.stringify(this.items) == '{}' && this.showHelp();
    for (let record in this.items) {
      new Item(record);
    }
  }
}