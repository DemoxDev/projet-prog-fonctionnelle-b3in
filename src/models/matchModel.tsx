import JoueurModel from "./joueurModel";

export default interface MatchModel {
    id: number,
    ville : string,
    date: string,
    joueurs: JoueurModel[],
    dateVille? : string
}