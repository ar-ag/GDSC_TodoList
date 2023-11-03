// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
 
  
  const [person1, person2] = await hre.ethers.getSigners();
  const todoList = await hre.ethers.deployContract("TodoList");

  await todoList.waitForDeployment();

  console.log(`
     deployed to ${todoList.target}\n`
  );

  console.log("Address of person1: ",person1.address)
  console.log("Address of person2: ",person2.address);

  console.log("\nAdding tasks\n");

  
  await todoList.connect(person1).AddNewTask("Person 1 task 1");
  await todoList.connect(person1).AddNewTask("Person 1 task 2");
  let person1Tasks = await todoList.connect(person1).getTasks();
  console.log(person1Tasks);

  await todoList.connect(person2).AddNewTask("Person 2 task 1");
  await todoList.connect(person2).AddNewTask("Person 2 task 2");
  await todoList.connect(person2).AddNewTask("Person 2 task 3");
  let person2Tasks = await todoList.connect(person2).getTasks();
  console.log(person2Tasks);

  console.log("\nAfter deleting some tasks\n");

  await todoList.connect(person1).DeleteTasks(0);
  person1Tasks = await todoList.connect(person1).getTasks();
  console.log(person1Tasks);

  await todoList.connect(person2).DeleteTasks(2);
  person2Tasks = await todoList.connect(person2).getTasks();
  console.log(person2Tasks)
  

  
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
