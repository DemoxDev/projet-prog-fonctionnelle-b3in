import React, { useEffect, useState } from "react";
import { getMatchs } from "../services/matchs.service";
import MatchModel from "../models/matchModel";



const MatchManagerPage = () => {

    const [matchs, setMatchs] = useState<MatchModel[]>([]);
    const [matchsAff, setMatchsAff] = useState<MatchModel[]>([]);

    const [isLoading, setIsLoading] = useState(false);

    const filter = (date:string) => {

        setMatchs(matchs.filter((m) => {
            return m.date === date
        }))
        
    }
    

    useEffect(() => {

        setMatchs(getMatchs())
        setMatchsAff(getMatchs())
    },[])

    const page = () => {
        return <>
        <h1>Mes matchs</h1>
        <ul>
            {matchsAff.map((v,i) => {
                return <>
                <h4>Match {i+1}</h4>
                <li>
                    {v.date} {v.ville}
                    <h3>Joueurs</h3>
                    <ul>
                        {v.joueurs.map((j) => {
                            return <li>{j.nom}</li>
                        })}
                    </ul>
                    </li>
                </>
            })}
        </ul>
        <button onClick={()=> {
            filter('12/01/2024')
        }}>Filter par date</button>
        <button onClick={() => {
            setMatchsAff(matchs)
        }}>Clear</button>
        </>
    }

    return(
        <>
        {page()}
        </>
    )
}

export default MatchManagerPage