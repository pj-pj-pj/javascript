import { createNode } from './node.js';

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

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
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
newTree.prettyPrint();
