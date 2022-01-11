export default (createdAt: Date, updatedAt: Date = createdAt) => {
  return { createdAt, updatedAt };
};
