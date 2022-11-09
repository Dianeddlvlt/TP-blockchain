//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract GestionUtilisateur {

    constructor() public {
    }

    struct Utilisateur {
        string Name;
        string Mail;
    }

    mapping(address => Utilisateur) listeUtilisateur;

    function register (string memory _name, string memory _mail) public {
        Utilisateur memory nouvelUtilisateur = Utilisateur(_name,_mail);
        listeUtilisateur[msg.sender] = nouvelUtilisateur;
    }

    function voirUtilisateur(address _address)public view returns (string memory, string memory) {
        return (listeUtilisateur[_address].Name, listeUtilisateur[_address].Mail);
    }

}