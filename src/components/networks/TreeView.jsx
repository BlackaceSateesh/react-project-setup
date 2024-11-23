/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import BinaryTreeNode from "../treeNodes/BinaryTreeNode";
import {
  calculateParentWithLeftSubtree,
  calculateParentWithRightSubtree,
  calculateTotalAmount,
  sumLeftSubtree,
  sumRightSubtree,
} from "../../utils/calculateFunc";

const TreeView = () => {
  const [treeData, setTreeData] = useState(null); // Start with null for loading state
  const [leftSum, setLeftSum] = useState(0);
  const [rightSum, setRightSum] = useState(0);
  const [leftSubTreeSum, setLeftSubTreeSum] = useState(0);
  const [rightSubTreeSum, setRightSubTreeSum] = useState(0);
  const [totalAmt, setTotalAmt] = useState(0);
  const [userId, setUserId] = useState('SSPI-SSPI1-SSPI2'); // Assuming you will have a userId that may change

  useEffect(() => {
    if (userId) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
  
      // Recursive function to find the user in the hierarchy, considering both members[0] and members[1]
      const findUserInHierarchy = (users, userId) => {
        for (let user of users) {
          // Check if the current user's ID matches
          if (user.id === userId) {
            return user; // Return the user if found
          }
  
          // Check both members[0] and members[1] if they exist
          if (user.members) {
            // Search through members[0]
            if (user.members[0]) {
              const foundUser = findUserInHierarchy([user.members[0]], userId);
              if (foundUser) {
                return foundUser; // Return the found user from members[0]
              }
            }
  
            // Search through members[1]
            if (user.members[1]) {
              const foundUser = findUserInHierarchy([user.members[1]], userId);
              if (foundUser) {
                return foundUser; // Return the found user from members[1]
              }
            }
          }
        }
        return null; // User not found in this user's hierarchy
      };
  
      // Use the recursive function to find the user
      const user = findUserInHierarchy(users, userId);
  
      if (user) {
        setTreeData(user); // Set tree data with the found user
        console.log(user);
  
        // Calculate required values for the binary tree
        const total = calculateTotalAmount(user);
        const left = sumLeftSubtree(user.members?.[0]); // Assuming left child is at index 0
        const right = sumRightSubtree(user.members?.[1]); // Assuming right child is at index 1
        const leftSubTree = calculateParentWithLeftSubtree(user);
        const rightSubTree = calculateParentWithRightSubtree(user);
  
        setLeftSum(left);
        setRightSum(right);
        setTotalAmt(total);
        setLeftSubTreeSum(leftSubTree);
        setRightSubTreeSum(rightSubTree);
      } else {
        console.log("User not found.");
      }
    }
  }, [userId]);
  

  // Fetch data from localStorage when userId changes
  // useEffect(() => {
  //   if (userId) {
  //     const users = JSON.parse(localStorage.getItem("users")) || [];
  //     const user = users.find(u => u.id === userId); // Find the user based on userId

  //     if (user) {
  //       setTreeData(user); // Set tree data with the found user
  //       console.log(user)
  //       // Calculate required values for the binary tree
  //       const total = calculateTotalAmount(user);
  //       const left = sumLeftSubtree(user.members?.[0]); // Assuming left child is at index 0
  //       const right = sumRightSubtree(user.members?.[1]); // Assuming right child is at index 1
  //       const leftSubTree = calculateParentWithLeftSubtree(user);
  //       const rightSubTree = calculateParentWithRightSubtree(user);

  //       setLeftSum(left);
  //       setRightSum(right);
  //       setTotalAmt(total);
  //       setLeftSubTreeSum(leftSubTree);
  //       setRightSubTreeSum(rightSubTree);
  //     }
  //   }
  // }, [userId]); // Dependency on userId

  // Log the values for debugging
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
  console.log("Tree Data:", treeData);

  if (!treeData) return <p>Loading...</p>; // Show loading state while fetching data

  const handleNodeClick = (clickedUserId) => {
    console.log("User ID clicked:", clickedUserId);
    setUserId(clickedUserId); // Update userId state, triggering data fetch
  };

  return (
    <>
      <div className="binary-tree-container">
        <h1 className="MainHeading">Binary Tree</h1>
        <BinaryTreeNode node={treeData} onClick={handleNodeClick} />
      </div>
    </>
  );
};

export default TreeView;
