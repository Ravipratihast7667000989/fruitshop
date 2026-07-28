export const autogenrateOrderId = () => {
  return "ORD-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
};