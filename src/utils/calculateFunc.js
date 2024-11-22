export const sumLeftSubtree = (node) => {
  if (!node) return 0;

  const totalLeft = node.left ? sumLeftSubtree(node.left) : 0;
  const totalRight = node.right ? sumLeftSubtree(node.right) : 0;

  return node.total + totalLeft + totalRight;
};

export const sumRightSubtree = (node) => {
  if (!node) return 0;

  const totalLeft = node.left ? sumRightSubtree(node.left) : 0;
  const totalRight = node.right ? sumRightSubtree(node.right) : 0;

  return node.total + totalLeft + totalRight;
};

export const calculateTotalAmount = (node) => {
  if (!node) return 0;

  const totalLeft = node.left ? calculateTotalAmount(node.left) : 0;
  const totalRight = node.right ? calculateTotalAmount(node.right) : 0;

  return node.total + totalLeft + totalRight;
};

export const calculateParentWithLeftSubtree = (node) => {
  if (!node) return 0;

  const totalLeft = node.left ? calculateParentWithLeftSubtree(node.left) : 0;
  return node.total + totalLeft;
};

export const calculateParentWithRightSubtree = (node) => {
  if (!node) return 0;

  const totalRight = node.right
    ? calculateParentWithRightSubtree(node.right)
    : 0;
  return node.total + totalRight;
};
