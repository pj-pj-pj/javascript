const createNode = (value) => {
  return {
    value: value,
    left: null,
    right: null,
  };
}

class Tree {
  constructor(array) {
    this.array = [...new Set(array.sort((a, b) => a - b))];
    this.root = this.buildtree(0, this.array.length - 1);
  }

  buildtree(start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const topNode = createNode(this.array[mid]);

    topNode.left = this.buildtree(start, mid - 1);
    topNode.right = this.buildtree(mid + 1, end);

    return topNode;
  }

  insert(data) {
    let current = this.root;

    if (current === null) current = createNode(data);

    while (current.value != data) {
      if (data < current.value) {
        if (current.left === null) current.left = createNode(data);
        current = current.left;
      } 

      if (data > current.value) {
        if (current.right === null) current.right = createNode(data);
        current = current.right;
      }
    }

    return;
  }

  delete(node, current = this.root) {
    if (!current) return current;

    //traverse the tree
    if (node < current.value) {
      current.left = this.delete(node, current.left);
    } else if (node > current.value) {
      current.right = this.delete(node, current.right);
    } else { //current found the node to be deleted

      //case 1 / 2: current has one or no children
      if (!current.left) {
        return current.right;
      } else if (!current.right) {
        return current.left;
      }

      //case 3: current has both children
      if (current.left && current.right) {
        current.value = this.findSmallestInRight(current.right);
        current.right = this.delete(current.right.value, current.right);
      }
    }
    return current;
  }

  findSmallestInRight(node) {
    let smallest = node.value;
    while (smallest.left) smallest = smallest.left.value;

    return smallest;
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
};


  
let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const newTree = new Tree(arr);
newTree.insert(2);
newTree.insert(4);
newTree.delete(8);
newTree.prettyPrint();
