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
    this.root = this.buildtree(0, this.array.length - 1, this.array);
  }

  buildtree(start, end, array) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const topNode = createNode(array[mid]);

    topNode.left = this.buildtree(start, mid - 1, array);
    topNode.right = this.buildtree(mid + 1, end, array);

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
    if (current.left) this.preorder(array, current.left);
    if (current.right) this.preorder(array, current.right);

    return array;
  }

  inorder(array = [], current = this.root) {
    if (current == null) return;

    if (current.left) this.inorder(array, current.left);
    array.push(current.value);
    if (current.right) this.inorder(array, current.right);

    return array;
  }

  postorder(array = [], current = this.root) {
    if (current == null) return;

    if (current.left) this.postorder(array, current.left);
    if (current.right) this.postorder(array, current.right);
    array.push(current.value);

    return array;
  }

  height(current = this.root, count = 0) {
    if (current == null) return 0;

    // add count when traversing the tree
    count++;

    let left = this.height(current.left, count);
    let right = this.height(current.right, count);

    // return which has the higher value,
    // this also assigns it to left or right variable
    // to retain the value of count at its highest
    return Math.max(count, left, right);
  }

  depth(value, current = this.root, count = -1) {
    if (current == null) return 0;

    count++;
    let left = this.depth(value, current.left, count);
    let right = this.depth(value, current.right, count);
    
    if (current.value == value) {
      return count;
    } else {
      count = 0;
    }

    return Math.max(count, left, right);
  }

  isBalanced(leftCount = 0, rightCount = 0, current = this.root) {
    if (current == null) return true;

    if (current.left) {
      current = current.left;
      leftCount = this.height(current.left) - this.height(current.right);
    }
    
    if (current.right) {
      current = current.left;
      leftCount = this.height(current.left) - this.height(current.right);
    }

    if (Math.abs(leftCount - rightCount) <= 1) return true;
    return false;
  }

  rebalance() {
    let balancedArr = [];
    this.inorder(balancedArr);
    this.root = this.buildtree(0, balancedArr.length - 1, balancedArr);
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
console.log(newTree.height());
console.log(newTree.depth(5));
console.log(newTree.isBalanced());

newTree.rebalance();
newTree.prettyPrint();
console.log(newTree.isBalanced());

