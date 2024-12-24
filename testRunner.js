// testRunner.js
const inquirer = require("inquirer");
const { execSync } = require("child_process");
const chalk = require("chalk");

// Its Just a dummy test cases, you can add your own test cases here
const testCases = {
  "Create New Student": "should create a new student successfully",
  "Invalid Data Test": "should return 400 for invalid data",
  "Invalid Grade Test": "should return 400 for invalid grade",
  "Existing Email Test": "should return 400 if email is already exist",
  "Registration Disabled": "should return 400 registration is disabled",
  "Password Length Test": "should return 400 if password length is less than 8",
};

async function runTests() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "Run All Tests",
          "Run Specific Test",
          //   "Run Failed Tests Only",
          //   "Run Successful Tests Only",
          "View Test Descriptions",
          "Exit",
        ],
      },
    ]);

    switch (action) {
      case "Run All Tests":
        runAllTests();
        break;
      case "Run Specific Test":
        await runSpecificTest();
        break;
      //   case "Run Failed Tests Only":
      //     runFailedTests();
      //     break;
      //   case "Run Successful Tests Only":
      //     runSuccessfulTests();
      //     break;
      case "View Test Descriptions":
        viewTestDescriptions();
        break;
      case "Exit":
        console.log(chalk.blue("Goodbye!"));
        return;
    }
  }
}

function runAllTests() {
  try {
    console.log(chalk.blue("\nRunning all tests...\n"));
    execSync("jest tests/integrations/api.test.js --verbose", {
      stdio: "inherit",
    });
  } catch (error) {
    console.log(
      chalk.red("\nSome tests failed. Check the output above for details.")
    );
  }
}

async function runSpecificTest() {
  const { testName } = await inquirer.prompt([
    {
      type: "list",
      name: "testName",
      message: "Which test would you like to run?",
      choices: Object.keys(testCases),
    },
  ]);

  try {
    console.log(chalk.blue(`\nRunning test: ${testName}\n`));
    execSync(
      `jest tests/integrations/api.test.js -t "${testCases[testName]}" --verbose`,
      { stdio: "inherit" }
    );
  } catch (error) {
    console.log(
      chalk.red("\nTest failed. Check the output above for details.")
    );
  }
}

// function runFailedTests() {
//   try {
//     console.log(chalk.blue("\nRunning failed tests...\n"));
//     execSync("jest tests/integrations/api.test.js --onlyFailures --verbose", {
//       stdio: "inherit",
//     });
//   } catch (error) {
//     console.log(
//       chalk.red("\nSome tests failed. Check the output above for details.")
//     );
//   }
// }

// function runSuccessfulTests() {
//   try {
//     console.log(chalk.blue("\nRunning successful tests...\n"));
//     execSync("jest tests/integrations/api.test.js --onlyPassing --verbose", {
//       stdio: "inherit",
//     });
//   } catch (error) {
//     console.log(
//       chalk.red("\nError running tests. Check the output above for details.")
//     );
//   }
// }

function viewTestDescriptions() {
  console.log(chalk.blue("\nTest Descriptions:"));
  Object.entries(testCases).forEach(([name, description]) => {
    console.log(chalk.green(`\n${name}:`));
    console.log(description);
  });
  console.log("\n");
}

// Start the CLI
runTests().catch(console.error);
