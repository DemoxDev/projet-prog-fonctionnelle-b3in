import { useEffect, useState } from "react";
import MatchModel from "../models/matchModel";
import MatchDTO from "../dtos/MatchDto";



export const getMatchs = () :MatchModel[] => {
    return [
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

}