/* eslint-disable react/prop-types */
import "../../style/treeNodes/BinaryTreeNode.css";

const BinaryTreeNode = ({ node }) => {
  if (!node) return null;

  return (
    <div className="tree-node">
      <div className="node">{node?.name} <br />{node?.total}</div>
      <div className="connection">
        {node?.left && <div className="horizontal-line" />}
        <div className="vertical-line" />
        {node?.right && <div className="horizontal-line" />}
      </div>
      <div className="tree-children">
        {node?.left && <BinaryTreeNode node={node?.left} />}
        {node?.right && <BinaryTreeNode node={node?.right} />}
      </div>
    </div>
  );
};

export default BinaryTreeNode;
