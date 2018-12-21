import axios from 'axios';

export default class GetCatFact{
    constructor(){        
    }


    async getResults(){

        try{
            const res = await axios('https://crossorigin.me/https://cat-fact.herokuapp.com/facts');
            this.fact = res;
            console.log(this.fact);

        }catch(error){
            alert(error);
        }
    }
}