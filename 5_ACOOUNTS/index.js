// Módulos externos
import chalk from "chalk";
import inquirer from "inquirer";

// Módulos internos
import fs from "fs";

async function operation() {
    try {
        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "O que deseja fazer?",
                choices: [
                    "Criar conta",
                    "Consultar saldo",
                    "Depositar",
                    "Sacar",
                    "Sair",
                ],
            },
        ]);

        const action = answer["action"];

        if (action === "Criar conta") {
            await createAccount();
        } else if (action === "Depositar") {
            await deposit();
        } else if (action === "Sacar") {
            await withdraw();
        } else if (action === "Consultar saldo") {
            await getAccountBalance();
        } else if (action === "Sair") {
            console.log(chalk.bgBlue.black("Obrigado por usar o Accounts."));
            process.exit();
        }
    } catch (err) {
        console.log(err);
    }
}

async function createAccount() {
    try {
        console.log(chalk.bgGreen.black("Obrigado por escolher o banco."));
        console.log(chalk.green("Defina as opções da sua conta a seguir:"));

        await buildAccount();
    } catch (err) {
        console.log(err);
    }
}

async function buildAccount() {
    try {
        const answer = await inquirer.prompt([
            {
                name: "accountName",
                message: "Digite um nome para a sua conta?",
            },
        ]);

        const accountName = answer["accountName"];

        if (!fs.existsSync("accounts")) {
            fs.mkdirSync("accounts");
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black("Esta conta já existe, escolha outro nome."));
            await buildAccount();
            return;
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', (err) => {
            if (err) {
                console.log(err);
            }
        });

        console.log(chalk.green("Conta criada com sucesso!"));
    } catch (err) {
        console.log(err);
    }
}

async function deposit() {
    try {
        const answer = await inquirer.prompt([
            {
                name: "accountName",
                message: "Qual o nome da sua conta?",
            },
        ]);

        const accountName = answer["accountName"];

        if (!checkAccount(accountName)) {
            return await deposit();
        }

        const depositAnswer = await inquirer.prompt([
            {
                name: 'amount',
                message: "Quanto você deseja depositar?",
            },
        ]);

        const amount = parseFloat(depositAnswer["amount"]);

        if (isNaN(amount) || amount <= 0) {
            console.log(chalk.bgRed.black("Por favor, insira um valor válido e maior que zero."));
            return await deposit();
        }

        await addAmount(accountName, amount);
        await operation();
    } catch (err) {
        console.log(err);
    }
}

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black("Esta conta não existe, escolha outro nome."));
        return false;
    }
    return true;
}

async function addAmount(accountName, amount) {
    try {
        const accountData = getAccount(accountName);

        if (!amount) {
            console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde."));
            return await deposit();
        }

        accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            JSON.stringify(accountData),
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        );

        console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta.`));
    } catch (err) {
        console.log(err);
    }
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: "utf-8",
        flag: "r",
    });

    return JSON.parse(accountJSON);
}

async function getAccountBalance() {
    try {
        const answer = await inquirer.prompt([
            {
                name: "accountName",
                message: "Qual o nome da sua conta?",
            },
        ]);

        const accountName = answer["accountName"];

        if (!checkAccount(accountName)) {
            return await getAccountBalance();
        }

        const accountData = getAccount(accountName);
        console.log(chalk.bgBlue.black(`Ola, o saldo da sua conta é de R$${accountData.balance} `));

        await operation();
    } catch (err) {
        console.log(err);
    }
}

async function withdraw() {
    try {
        const answer = await inquirer.prompt([
            {
                name: "accountName",
                message: "Qual o nome da sua conta?",
            },
        ]);

        const accountName = answer["accountName"];

        if (!checkAccount(accountName)) {
            return await withdraw();
        }

        const withdrawalAnswer = await inquirer.prompt([
            {
                name: "amount",
                message: "Quanto deseja sacar?",
            },
        ]);

        const amount = parseFloat(withdrawalAnswer["amount"]);

        if (isNaN(amount) || amount <= 0) {
            console.log(chalk.bgRed.black("Por favor, insira um valor válido e maior que zero."));
            return await withdraw();
        }

        removeAmount(accountName, amount);
        await operation();
    } catch (err) {
        console.log(err);
    }
}

function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName);

    if (!amount) {
        console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde."));
        return withdraw();
    }

    if (amount > accountData.balance) {
        console.log(chalk.bgRed.black("Saldo insuficiente. Por favor, insira um valor menor."));
        return withdraw();
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),

        (err) => {
            if (err) {
                console.log(err);
            }
        }
    )

    console.log(chalk.green(`Foi realizado um saque de R$${amount} da sua conta.`));
}

operation();
