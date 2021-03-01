export class RescueTeam{
    constructor(
        public name: string,
        public members : number,
        public requestIdAssigned: number,
        public location: string,
        public typeOfTeam: string,
        public status: string 
    ){}
}