import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { match, ok } from "assert";
import MatchModel from "./models/matchModel";
import JoueurModel from "./models/joueurModel";
import MatchManagerPage from "./pages/matchManager";

function App() {
  const [clients, setClients] = useState([
    { nom: "Dupont", prenom: "Jean", age: 52 },
    { nom: "Dupont", prenom: "Marie", age: 46 },
    { nom: "Durant", prenom: "Jean Marie", age: 35 },
  ]);
  const [x, setX] = useState<number>(0);
  const [numbers, setNumbers] = useState<number[]>([1, 2, 3, 4, 5]);
  const [typing, setTyping] = useState<string>("");

  const [joueurs, setJoueurs] = useState<JoueurModel[]>([
    {
      id: 1,
      nom: "Jean",
      taille: 178,
    },
    { id: 2, nom: "Martin", taille: 182 },
    { id: 3, nom: "Jean", taille: 193 },
  ]);

  const [joueurs_matchs, setJoueurs_matchs] = useState([
    {
      id: 1,
      match_id: 1,
      joueur_id: 1,
    },
    { id: 2, match_id: 1, joueur_id: 2 },
  ]);
  const [matches, setMatches] = useState<MatchModel[]>([]);

  useEffect(() => {
    //
    var matchs = [
      {
        id: 1,
        ville: "Paris",
        date: "12/01/2024",
        joueurs: [
          {
            id: 1,
            nom: "Jean",
            taille: 178,
          },
          { id: 2, nom: "Martin", taille: 182 },
        ],
      },
      {
        id: 2,
        ville: "Lyon",
        date: "12/05/2024",
        joueurs: [
          {
            id: 1,
            nom: "Jean",
            taille: 178,
          },
          { id: 3, nom: "Jean", taille: 193 },
        ],
      },
    ];
    setMatches(matchs);

    //tD();
    q3();
    rSum([1,2,3,4,5],0,0);
  }, []);

  const q3 = () => {
    var res: JoueurModel[] = [];
    joueurs.forEach(
      (joueur) => {
        joueur.taille > 180 ? (
          res.push({ nom: joueur.nom, taille: joueur.taille })
        ) : (
          <></>
        );
        //return joueur.taille > 180
      }
      // [{"nom" :"...", "taille" : ...}, ...]
    );
    console.log("q3");
    console.log(res);
  };

  const q4 = (id: number) => {
    console.log(
      matches.find((value) => {
        return value.id === id;
      })?.joueurs.length
    );
  };

  const q5 = (id: number) => {
    console.log(
      Object.values(
        matches
        .find((value) => {
          return value.id === id;
        })?.joueurs as JoueurModel[]
      ).map((el) => {
        return { nom: el["nom"], taille: el["taille"] };
      })
    );
  };

  const q6 = () => {
    var noms :Object[] = []
    console.log(matches)
    matches.forEach((match,indexm) =>  {
      var joueurs = match.joueurs
      joueurs.forEach((j ) => {
        matches.forEach((v,i) => {
          if(i>indexm){
            var jres = v.joueurs.find((jf) =>  j.id === jf.id)
            jres ? noms.push(jres) : <></>
          }
        })
      })

      
  })
  var res = new Set(noms)
      //utiliser la reponse de la question 1
      
      console.log(res)
}

  const q6Itératif = () => {
    var noms : string[] = []
    for(var i=0;i<matches.length;i++)
      for (var j of matches[i].joueurs) 
        for(var k=i+i; matches.length;k++)
          for(var j1 of matches[k].joueurs)
          if(j.id === j1.id){
            noms.push(j.nom)
          
        
      
    }
    var res = new Set(noms)
      console.log(res)
   };

   const exIteratif = () => {
    const nums = [1,2,3,4,5]
    var sum = 0
    for(var n of nums) {
      sum+=n
    }
    console.log(sum)
   }
   
   const rSum = (nums: number[], i: number, sum: number) => {

    if(i === nums.length) {
      console.log(sum)
      return sum
    }
      else {
        rSum(nums,i+1, sum+nums[i])
    }
   }

  /*
  const setXWithLog = (newValueX: number) => {
    setX(newValueX)
    console.log(newValueX)
  }
*/
  const tD = () => {
    //liste distincte des nom des joueurs
    var joueursNoms: Array<string> = [];

    joueurs.forEach((value) => {
      joueursNoms.push(value.nom);
    });

    console.error(joueursNoms);

    var result: string[] = [];

    joueursNoms.forEach((value) => {
      if (result.indexOf(value) === -1) {
        result.push(value);
      } else {
      }
    });

    console.log(result);

    //classer les noms des joueurs par taille croissante
    joueurs.sort((a: JoueurModel, b: JoueurModel) => {
      return a.taille - b.taille;
    });

    joueurs.forEach((value) => {
      joueursNoms.push(value.nom);
    });
  };
  const exemple = () => {
    //setXWithLog(2)
    // je ne peux pas changer la valeur de x car c'est un constante
    // x=2;
    setX(2);

    //numbers[1] = 18 // est ce que c'est problématique ?
    //j'aurais dut
    setNumbers(numbers.map((value, index) => (index === 1 ? 18 : value))); // pas de return
    // map retourne un booleen
    //console.error("numbers =")
    //console.log(numbers)

    //console.error("numbers with foreach")
    /*numbers.forEach((element) => {
      console.log(element)
    })*/

    clients.filter((value) => {
      return value.prenom.includes("Jean");
      // value.prenom ==="Jean" que ceux qui ont Jean comme prénom
      // !value.prenom.includes("Jean") que ceux qui ont pas Jean dans le prenom
    });

    //je teste et je remarque que clients n'a pas changé
    //console.log(clients)

    setClients(
      clients.filter((value) => {
        //console.log(value.prenom)
        return value.prenom.includes("Jean");
        // value.prenom ==="Jean" que ceux qui ont Jean comme prénom
        // !value.prenom.includes("Jean") que ceux qui ont pas Jean dans le prenom
      })
    );

    //console.log(clients)
  };


  return (
    <div className="App">
      <MatchManagerPage></MatchManagerPage>
      <input
        type="button"
        onClick={() => {
          exemple();
        }}
        value={"Cliquez pour executer"}
      ></input>
      <input
        type="text"
        onChange={(e) => {
          setTyping(e.target.value);
          console.log(typing);
        }}
      ></input>
      <input
        type="button"
        onClick={() => {
          //recupérer les infos des matchs
          matches.forEach((match) => {
            //j'ai cahngé la structre de jMMAP
            console.log(match.ville);
            console.log(match.date);
            match.joueurs.forEach((joueur) => {
              console.log(joueur);
            });
            //ou
            console.log("ou");
            console.log(match);
          });
          console.log(typing);
          console.log(clients);
          console.log(numbers);
        }}
        value={"voir"}
      ></input>
      <input
        type="button"
        value={"q4"}
        onClick={() => {
          //q4(1);
          //q5(1);
          q6()
        }}
      ></input>
    </div>
  );
}



export default App;
