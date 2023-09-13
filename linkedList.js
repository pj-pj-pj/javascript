import { createNode } from './node.js';

class LinkedList {
  constructor() {}

  head = null;
  size = 0;

  append(value) {
    if (this.head == null) {
      this.head = value;
    } else {
      this.tail().next = value;
    }

    this.size++;
  }

  prepend(value) {
    value.next = this.head;
    this.head = value;
    this.size++;
  }

  size() {
    return this.size;
  }

  head() {
    return this.head;
  }

  tail() {
    let tmp = this.head;
    while (tmp && tmp.next != null) tmp = tmp.next;
    return tmp;
  }

  at(index) {
    if (index >= this.size) return null;

    let i = 0;
    let tmp = this.head;
    while (i < index) {
      tmp = tmp.next;
      i++;
    }

    return tmp;
  }

  pop = () => {
    if (this.size > 1) {
      this.at(this.size - 2).next = null;
    } else {
      this.head = null;
    }

    this.size--;
  };

  contains(value) {
    let tmp = this.head;
    while (tmp) {
      if (tmp.value === value) return true;
      tmp = tmp.next;
    }

    return false;
  }

  find(val) {
    for (let i = 0; i < this.size; i++) {
      if (this.at(i).value == val) {
        return i;
      }
    }

    return null;
  }

  toString() {
    let tmp = this.head;
    let stringNode = ``;
    while (tmp.next) {
      stringNode += `( ${tmp.value} ) -> `;
      tmp = tmp.next;
    }

    stringNode += `( ${tmp.value} ) -> null`;

    return stringNode;
  }

  insertAt(value, index) {
    if (index > this.size) this.append(value);
    if (index === 0) {
      this.prepend(value);
    } else {
      value.next = this.at(index);
      this.at(index - 1).next = value;
    }

    this.size++;
  }

  removeAt(index) {
    if (index == 0) this.head = this.head.next;

    this.at(index - 1).next = this.at(index).next;
    this.size--;
  }
}

const list = new LinkedList();
const a = createNode('a');

list.append(a);
list.prepend(createNode('b'));
list.append(createNode('c'));
list.insertAt(createNode('d'), 1);
list.removeAt(1);

console.log(list.toString());
console.log(list.size);
