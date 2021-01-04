const counter = (count = [], action) => {

  switch (action.type) {
    case 'ADD_TO_COUNT':
      return [...count, action.payload];
    case 'REMOVE_FROM_COUNT':
      // return cout.filter((counter) => cou.productId !== action.payload.productId);

    case 'REMOVE_ALL_COUNT':
      return [];
  }
  return count;
};

export default counter;
