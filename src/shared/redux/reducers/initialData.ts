import { InitialDataModel } from "../../models/dataModel";

const initialDataModel: InitialDataModel = new InitialDataModel({
    contentCurrentLCName: 'test@test.com',
    lcId: '00955'
});

const initialDataReducer = (state: InitialDataModel = initialDataModel, action: any) => {

    switch (action.type) {
        case 'FULL':
            return new InitialDataModel(action.payload);
        case 'LC':
            const dataModel: InitialDataModel = new InitialDataModel({
                contentCurrentLCName: state.email,
                lcId: action.payload.lcId
            })
            return dataModel;
        default:
            return state;    
    }
}

export default initialDataReducer;