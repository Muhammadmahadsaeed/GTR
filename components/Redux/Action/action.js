const userObject = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
}

const removeUser = ()=>{
  return{
    type : "REMOVE_USER",
    
  }
}

export { 
  userObject,
  removeUser
}
