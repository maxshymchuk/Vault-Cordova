class Vault {
  constructor() {
    container.innerHTML = '';
  }

  remove(node) {
    if (node != null) {
      const p = node.parentNode;
      p.childNodes.forEach(e => {
        e == node && p.removeChild(e);
      });
    }
  }

  logout() {
    content != null && this.remove(content.content);
    menu != null && this.remove(menu.menu);
    login = new Login();
  }
  
  login() {
    content = new Content();
    content.fill();
    menu = new Menu();
  }
}