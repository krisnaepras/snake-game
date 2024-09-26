# Simple Bank System

This project is a simple bank account management system implemented in JavaScript, with two versions: a **web-based interface** and a **terminal-based interface**. It allows users to perform basic banking operations such as checking balance, making deposits, and withdrawing funds.

## Features

- **Web Version**: A user-friendly interface built with HTML, CSS (Tailwind), and JavaScript. Users can interact with the system via buttons and modal dialogs.
- **Terminal Version**: A command-line interface (CLI) that allows users to interact with the system by entering commands directly into the terminal.

## Web Version

### How It Works:
1. Displays the current account balance on the screen.
2. Provides two buttons: **Deposit** and **Withdraw**.
3. Clicking either button opens a modal where users can input the desired amount.
4. After submitting, the system updates the balance and displays a success or error message.

### Tech Stack:
- **HTML**
- **CSS**: Styled using [Tailwind CSS](https://tailwindcss.com/).
- **JavaScript**: Handles all functionality, including DOM manipulation and asynchronous operations using `Promise` and `setTimeout()`.

### How to Run:
1. Clone this repository:
    ```bash
    git clone https://github.com/your-username/simple-bank-system.git
    ```
2. Open the `index.html` file in a web browser.

### How It Works:
1. Displays the current balance in the terminal.
2. Provides a menu with options to **Deposit**, **Withdraw**, or **Exit**.
3. Users can input the desired amount for deposit or withdrawal.
4. The balance is updated after each operation, with success or error messages shown in the terminal.

### Tech Stack:
- **Node.js**: This version uses Node.js and the `readline` module for input/output operations.

### How to Run:
1. Clone this repository:
    ```bash
    git clone https://github.com/your-username/simple-bank-system.git
    ```
2. Navigate to the project directory:
    ```bash
    cd simple-bank-system
    ```
3. Run the terminal version using Node.js:
    ```bash
    node banking_system_v_terminal.js
    ```
