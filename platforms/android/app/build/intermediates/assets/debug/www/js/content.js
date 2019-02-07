// array of checked elements
let checked = [];

class Content {
  constructor() {
    this.content = document.createElement('div');
    this.content.setAttribute('id', 'content');

    this.help = document.createElement('div');
    this.help.setAttribute('class', 'help');
    this.help.innerText = 'Empty! :(';
    this.help.shown = false;

    container.appendChild(this.content);
    
    this.order = [];
    this.items = {};
    Object.keys(storage).filter(i => i.indexOf('item') + 1).forEach(item => {
      this.items[item] = JSON.parse(storage.getItem(item));
    });
  }

  showHelp() {
    !this.help.shown && this.content.appendChild(this.help);
    this.help.shown = true;
  }

  hideHelp() {
    this.help.shown && vault.remove(this.help);
    this.help.shown = false;
  }

  fill() {
    JSON.stringify(this.items) == '{}' && this.showHelp();
    this.order = Object.keys(this.items).sort((a, b) => {
      return this.items[a].order - this.items[b].order;
    });
    this.order.forEach(record => new Item(record));
  }
}