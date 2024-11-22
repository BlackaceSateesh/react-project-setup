/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { binaryTreeData } from "../../constants/dummy/binary-tree-api";
import BinaryTreeNode from "../treeNodes/BinaryTreeNode";
import {
  calculateParentWithLeftSubtree,
  calculateParentWithRightSubtree,
  calculateTotalAmount,
  sumLeftSubtree,
  sumRightSubtree,
} from "../../utils/calculateFunc";

const TreeView = () => {
  const [treeData, setTreeData] = useState(binaryTreeData);
  if (!treeData) return <p>Loading...</p>;
  console.log(treeData);

  const [leftSum, setLeftSum] = useState(0);
  const [rightSum, setRightSum] = useState(0);
  const [leftSubTreeSum, setLeftSubTreeSum] = useState(0);
  const [rightSubTreeSum, setRightSubTreeSum] = useState(0);
  const [totalAmt, settotalAmt] = useState(0);

  useEffect(() => {
    const total = calculateTotalAmount(binaryTreeData);
    const left = sumLeftSubtree(binaryTreeData.left);
    const right = sumRightSubtree(binaryTreeData.right);
    const leftSubTree = calculateParentWithLeftSubtree(binaryTreeData);
    const rightSubTree = calculateParentWithRightSubtree(binaryTreeData);

    setLeftSum(left);
    setRightSum(right);
    settotalAmt(total);
    setLeftSubTreeSum(leftSubTree);
    setRightSubTreeSum(rightSubTree);
  }, []);
  console.log(
    "leftSum:",
    leftSum,
    "rightSum:",
    rightSum,
    "totalAmt:",
    totalAmt,
    "leftSubTreeSum:",
    leftSubTreeSum,
    "rightSubTreeSum:",
    rightSubTreeSum
  );

  return (
    <>
      <div className="binary-tree-container">
        <h1 className="MainHeading">Binary Tree</h1>
        <BinaryTreeNode node={treeData} />
      </div>
    </>
  );
};

export default TreeView;
