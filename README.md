# CiFarm Periphery Server

The **CiFarm Periphery Server** is a NestJS application designed to connect the CiFarm ecosystem to blockchain networks. This server enables functionalities such as reading information from the blockchain and performing actions like minting and burning tokens. It acts as an intermediary, controlled by the CiFarm server, to facilitate secure interactions with blockchain technology.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [Contributing](#contributing)
9. [License](#license)
10. [Acknowledgments](#acknowledgments)

## Introduction

The CiFarm Periphery Server plays a crucial role in the CiFarm ecosystem by enabling communication with blockchain networks. It provides basic blockchain authentication through signing and verifying messages, ensuring secure operations when interacting with smart contracts and executing various blockchain functionalities.

## Features

- **Blockchain Connectivity**: Connects to various blockchain networks to read information and execute actions.
- **Minting and Burning**: Facilitates the minting and burning of tokens as required by the CiFarm application.
- **Basic Authentication**: Provides functionality for signing and verifying messages for secure blockchain interactions.
- **Controlled by CiFarm Server**: Acts as a controlled service to manage blockchain-related operations seamlessly.

## Architecture

The server is built using **NestJS**, a progressive Node.js framework. The architecture includes:

- **NestJS Framework**: Provides a modular and scalable structure for building server applications.
- **Blockchain Interfaces**: Connects with different blockchain networks through appropriate libraries and APIs.
- **Authentication Module**: Handles message signing and verification for secure transactions.

## Installation

To set up the CiFarm Periphery Server, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/cifarm-periphery-server.git
   cd cifarm-periphery-server
2. **Install Dependencies: Install the required Node.js packages:**
   ```bash
   npm install
3. Set Up Environment Variables: Create a .env file based on the provided .env.example file. Configure your environment variables within this file, including connection details for your blockchain network.
4. **Run the server***
   ```bash
   npm run start
