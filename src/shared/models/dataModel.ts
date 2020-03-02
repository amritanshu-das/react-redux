class InitialDataModel {
    email: string;
    lcId: string;

    constructor(obj: any) {
        this.email = obj.contentCurrentLCName;
        this.lcId = obj.lcId;
    }
}

export { InitialDataModel }