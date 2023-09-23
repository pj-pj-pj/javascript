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

  insert(data, current = this.root) {
    if (current === null) return createNode(data);

    if (data < current.value) {
      current.left = this.insert(data, current.left);
    } else if (data > current.value) {
      current.right = this.insert(data, current.right);
    }
    
    return current;
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
        current.right = this.delete(current.value, current.right);
      }
    }
    return current;
  }

  findSmallestInRight(node) {
    let smallest = node;
    while (smallest.left) smallest = smallest.left;

    return smallest.value;
  }

  find(value, current = this.root) {
    if (current === null || current.value === value) return current;

    if (value < current.value) {
      return this.find(value, current.left);
    } else if (value > current.value) {
      return this.find(value, current.right);
    }
  }

  levelOrder(array = [], current = this.root, queue = []) {
    if (current == null) return;
    queue.push(current);

    while (queue.length > 0) {
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);

      array.push(queue[0].value);
      queue.shift();
      current = queue[0];
    }

    return array;
  }

  preorder(array = [], current = this.root) {
    if (current == null) return;

    array.push(current.value);
    if (current.left) this.preorder(current.left, array);
    if (current.right) this.preorder(current.right, array);

    return array;
  }

  inorder(array = [], current = this.root) {
    if (current == null) return;

    if (current.left) this.inorder(current.left, array);
    array.push(current.value);
    if (current.right) this.inorder(current.right, array);

    return array;
  }

  postorder(array = [], current = this.root) {
    if (current == null) return;

    if (current.left) this.postorder(current.left, array);
    if (current.right) this.postorder(current.right, array);
    array.push(current.value);

    return array;
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

console.log(newTree.find(324));
console.log(newTree.levelOrder());
console.log(newTree.inorder());
console.log(newTree.preorder());
console.log(newTree.postorder());
