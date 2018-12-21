import CatFact from './models/CatFact';

const state = {};

const controlCatFact = async () => {
    state.catFact = new CatFact();
    await state.catFact.getResults();
    console.log(state.catFact+'success');
}

controlCatFact();