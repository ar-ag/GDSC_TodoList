const hre = require("hardhat");

async function main() {
 
    
  const todoList = await hre.ethers.deployContract("TodoList");

  await todoList.waitForDeployment();

  

  console.log(`
     deployed to ${todoList.target}\n`
  );

  

  await todoList.AddNewTask("Task #1");
  await todoList.AddNewTask("#Task #2");
  let abc = await todoList.DeleteTasks(0);
  let tasks = await todoList.getTasks();

  console.log(abc);
  console.log(tasks);

  

  
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });