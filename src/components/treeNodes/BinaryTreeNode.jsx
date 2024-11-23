/* eslint-disable react/prop-types */
import "../../style/treeNodes/BinaryTreeNode.css";

const BinaryTreeNode = ({ node, onClick }) => {
  if (!node) return null;

  // Define left and right children based on the position property
  const leftChild = node?.members?.find(child => child?.position === 'left');
  const rightChild = node?.members?.find(child => child?.position === 'right');

  return (
    <div className="tree-node">
      <div className="node" onClick={() => onClick(node?.id)}>
        <strong>{node?.name}</strong> <br />
        Email: {node?.email} <br />
        ID: {node?.id} <br />
        Position: {node?.position} <br />
        Sponsor Email: {node?.sponsoremail}
      </div>
      <div className="connection">
        {leftChild && <div className="horizontal-line" />}
        <div className="vertical-line" />
        {rightChild && <div className="horizontal-line" />}
      </div>
      <div className="tree-children">
        {leftChild && <BinaryTreeNode node={leftChild} onClick={onClick} />}
        {rightChild && <BinaryTreeNode node={rightChild} onClick={onClick} />}
      </div>
    </div>
  );
};

export default BinaryTreeNode;











// /* eslint-disable react/prop-types */
// import "../../style/treeNodes/BinaryTreeNode.css";

// const BinaryTreeNode = ({ node }) => {
//   if (!node) return null;

//   return (
//     <div className="tree-node">
//       <div className="node">{node?.name} <br />{node?.total}</div>
//       <div className="connection">
//         {node?.left && <div className="horizontal-line" />}
//         <div className="vertical-line" />
//         {node?.right && <div className="horizontal-line" />}
//       </div>
//       <div className="tree-children">
//         {node?.left && <BinaryTreeNode node={node?.left} />}
//         {node?.right && <BinaryTreeNode node={node?.right} />}
//       </div>
//     </div>
//   );
// };

// export default BinaryTreeNode;
