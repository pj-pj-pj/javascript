class LinkedList {
  constructor() {}

  head = null;
  size = 0;

  append(value) {
    if (this.head == null) {
        this.head = value;
    } else {
        this.tail().nextNode = value;
    }

    this.size++;
  }

  prepend(value) {
    value.nextNode = this.head;
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
    while (tmp && tmp.nextNode != null) tmp = tmp.nextNode;
    return tmp;
  }

  at(index) {
    if (index >= this.size) return null;

    let i = 0;
    let tmp = this.head;
    while (i < index) {
      tmp = tmp.nextNode;
      i++;
    }

    return tmp;
  }

  pop = () => {
    if (this.size > 1) {
      this.at(this.size - 2).nextNode = null;
    } else {
      this.head = null;
    }

    this.size--;    
  }

  contains(value) {
    let tmp = this.head;
    while (tmp) {
      if (tmp.value === value) return true;
      console.log(tmp.value)
      tmp = tmp.nextNode;
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
    while (tmp.nextNode) {
      stringNode += `( ${tmp.value} ) -> `;
      tmp = tmp.nextNode;
    }

    stringNode += `( ${tmp.value} ) -> null`;

    return stringNode;
  }

  insertAt(value, index) {
    if (index > this.size) this.append(value);
    if (index === 0) {
      this.prepend(value);
    } else {
      value.nextNode = this.at(index);
      this.at(index - 1).nextNode = value;
    }
  }

  removeAt(index) {
    if (index == 0) this.head = this.head.nextNode;

    this.at(index - 1).nextNode = this.at(index).nextNode;
  }
}