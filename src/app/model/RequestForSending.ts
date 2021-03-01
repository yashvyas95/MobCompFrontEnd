export class RequestForSending
{
    constructor(
        public name: string,
        public numberOfPeople : number,
        public natureOfAssistance: string,
        public location: string,
        public assignedToTeamId: number,
        public boolean: string 
    ){}
}