import JoueurDTO from "./JoueurDto";


export default interface MatchDTO {
    id: number,
    ville : string,
    date: string,
    joueurs: JoueurDTO[]
}