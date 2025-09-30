<?php
    class controleurDefault{
		static public function accueil(){
			$titre = "home";
            $css = "accueil";
			include("Vue/header.php");
            include("Vue/navbar.php");
            echo "<div>";
                 include("Vue/accueil.php");
            echo "</div>";
			include("Vue/footer.php");
		}
	}