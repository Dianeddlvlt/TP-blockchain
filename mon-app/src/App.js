import { Web3 } from 'web3';
import { useEffect, useState } from 'react';

function App() {

    const {ethereum} =window;
    let account;
  // Dans un premier temps on se connecte à Metamask
    const connectMetamask = async () => {
        if(window.ethereum !== "undefined") {
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            account = accounts[0];
            //on affiche l'adresse de connection
            document.getElementById("accountArea").innerHTML = account;
        }
    }

    //Ensuite on se connecte au contract de solidity
    const connectContract = async () => {
      //On copie l'ABI de solidity
        const ABI = [
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "_name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_mail",
                "type": "string"
              }
            ],
            "name": "register",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_address",
                "type": "address"
              }
            ],
            "name": "voirUtilisateur",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ];
        
        //On copie l'adresse générée après le deploy sur solidity
        const Address = "0x8CC7C82B6b014591357941B5B440a035F78a1901";
        window.web3 = await new Web3(window.ethereum);
        window.contract = await new window.web3.eth.Contract( ABI, Address); 
        //On affiche un message afin de confirmer la connexion
        document.getElementById("contractArea").innerHTML = "connected to smart contract : Gestion Utilisateur";
    }

    //Enfin on affiche les utilisateurs sur le contract
    const seeUser = async () => {
    const Address = "0x8CC7C82B6b014591357941B5B440a035F78a1901";
    const data = await window.contract.methods.voirutilisateur(Address).call();
    //Affichage des Noms et email des utilisateurs
    document.getElementById("dataArea").innerHTML = data;
    }
}

export default App;