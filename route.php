<?php
    //Definitions des controleurs existants / par defaults
    $controleur = "controleurDefault";
    $tableauControleurs = ["controleurDefault"];
    $actionParDefault = array(
		"controleurDefault" => "accueil"
	);

    //Verification du controleur cible
    if(isset($_GET["controleur"]) && in_array($_GET["controleur"], $tableauControleurs, true)){
		$controleur = $_GET["controleur"];
	}

    //Inclusion du bon controleur
    include("Controleur/$controleur.php");

    //Recupération de l'action cible
    $action = $actionParDefault[$controleur];
	$classActions = get_class_methods($controleur);

    //Verification de l'existance de l'action
	if(isset($_GET["action"]) && in_array($_GET["action"], $classActions, true)){
		$action = $_GET["action"];
	}

    //Demarrage la session
    session_start();

    //Appel de l'action cible (ou par default si invalide)
    $controleur::$action();