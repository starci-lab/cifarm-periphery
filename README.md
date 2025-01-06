# CiFarm Periphery Server

The **CiFarm Periphery Server** is a NestJS application designed to connect the CiFarm ecosystem to blockchain networks. This server enables functionalities such as reading information from the blockchain and performing actions like minting and burning tokens. It acts as an intermediary, controlled by the CiFarm server, to facilitate secure interactions with blockchain technology.

## Related Repositories
Here are the related repositories for different components of the CiFarm ecosystem:

- **Game (Client - Unity)**: [CiFarm Client](https://github.com/starci-lab/cifarm-client)
- **Game Server (Backend)**: [CiFarm Server](https://github.com/starci-lab/cifarm-server)
- **Wallet Integration for Game**: [CiWallet](https://github.com/starci-lab/ciwallet)
- **Telegram Bot**: [CiWallet Bots](https://github.com/starci-lab/ciwallet-bots)
- **Blockchain Backend**: [CiFarm Periphery](https://github.com/starci-lab/cifarm-periphery)

## Introduction

The CiFarm Periphery Server plays a crucial role in the CiFarm ecosystem by enabling communication with blockchain networks. It provides basic blockchain authentication through signing and verifying messages, ensuring secure operations when interacting with smart contracts and executing various blockchain functionalities.

## Features

- **Blockchain Connectivity**:  
  Connects to various blockchain networks to read information and execute actions.

- **Minting and Burning**:  
  Facilitates the minting and burning of tokens as required by the CiFarm application.

- **Basic Authentication**:  
  Provides functionality for signing and verifying messages for secure blockchain interactions.

- **Controlled by CiFarm Server**:  
  Acts as a controlled service to manage blockchain-related operations seamlessly.

## Architecture

The server is built using **NestJS**, a progressive Node.js framework. The architecture includes:

- **NestJS Framework**:  
  Provides a modular and scalable structure for building server applications.

- **Blockchain Interfaces**:  
  Connects with different blockchain networks through appropriate libraries and APIs.

- **Authentication Module**:  
  Handles message signing and verification for secure transactions.
