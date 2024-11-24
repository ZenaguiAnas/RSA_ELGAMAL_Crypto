# Encryption/Decryption Application Documentation

## Overview

The Encryption/Decryption Application is a modern web application built with Next.js for the client side and the backend for the business logic that provides secure message encryption, digital signatures, and X.509 certificate management. It supports multiple encryption algorithms including RSA and ElGamal.

![Home Page](https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&auto=format&fit=crop&q=60)

# Implementation of RSA and ElGamal Algorithms

---

### Supervised by:
**Pr. Abderrahim GHADI**

### Created by:
**Anas ZENAGUI**

---

## Table of Contents
1. [Features Overview](#features-overview)
    - [Home Page](#1-home-page)
    - [Encryption Page](#2-encryption-page)
    - [Decryption Page](#3-decryption-page)
2. [API Integration](#api-integration)
    - [Encryption API](#encryption-api)
3. [Security Features](#security-features)
    - [RSA Implementation](#1-rsa-implementation)
    - [ElGamal Implementation](#2-elgamal-implementation)
    - [Digital Signatures](#3-digital-signatures)
4. [Usage Guide](#usage-guide)
    - [Encrypting a Message](#1-encrypting-a-message)
    - [Creating a Digital Signature](#2-creating-a-digital-signature)
    - [Generating a Certificate](#3-generating-a-certificate)
    - [Decrypting a Message](#4-decrypting-a-message)
    - [Verifying a Signature](#5-verifying-a-signature)
5. [Business Logic](#business-logic)
    - [Encryption Flow](#encryption-flow)
    - [Signature Flow](#signature-flow)
    - [Certificate Generation](#certificate-generation)
6. [Conclusion](#conclusion)

---

## Features Overview

### 1. Home Page
The home page serves as the starting point for users, providing an overview of the application's purpose and functionalities.

**Main Content:**
- **Encrypt Section**
  - **Title:** "Encrypt"
  - **Description:** "Transform your messages into secure, encrypted data"
  - **Button:** "Go to Encryption"
- **Decrypt Section**
  - **Title:** "Decrypt"
  - **Description:** "Decode encrypted messages back to their original form"
  - **Button:** "Go to Decryption"

---

### 2. Encryption Page
This page facilitates message encryption using algorithms such as RSA and ElGamal.

**User Interface:**
- A seamless experience for selecting encryption algorithms, inputting messages, and generating encrypted outputs.

---

### 3. Decryption Page
This page handles message decryption and signature verification.

**User Interface:**
- Allows users to decrypt messages and verify digital signatures effectively.

---

## API Integration

### Encryption API
Details regarding the implementation and integration of the encryption API.

---

## Security Features

### 1. RSA Implementation
- **Key size:** 2048 bits
- **Padding:** PKCS#1 v1.5
- **Random Number Generation:** Secure and cryptographically strong

### 2. ElGamal Implementation
- **Prime field arithmetic**
- **Secure parameter generation**
- **Key exchange protocol**

### 3. Digital Signatures
- Implementation details for creating and verifying digital signatures.

---

## Usage Guide

### 1. Encrypting a Message
- Select the encryption algorithm (RSA/ElGamal).
- Enter the message.
- Click "Encrypt Message."
- Copy the Base64 encoded output.

### 2. Creating a Digital Signature
- Enter the message to sign.
- Click "Sign Message."
- Save the generated signature.

### 3. Generating a Certificate
- Fill in the certificate details.
- Click "Generate Certificate."
- Download the X.509 certificate.

### 4. Decrypting a Message
- Select the encryption algorithm (RSA/ElGamal).
- Enter the encrypted message.
- Click "Decrypt Message."

### 5. Verifying a Signature
- Select the encryption algorithm (RSA/ElGamal).
- Enter the original message.
- Enter the digital signature.

---

## Business Logic

### Encryption Flow
Details of the encryption process.

### Signature Flow
Details of the signature creation and verification process.

### Certificate Generation
Steps for generating X.509 certificates.

---

## Conclusion
This application simplifies and secures the encryption and decryption of messages using robust algorithms. It is user-friendly, reliable, and provides a solid foundation for enhancing data security solutions.

---
