export class UserModel {
    user: any;
    public constructor(
    // tslint:disable-next-line: variable-name
    public _id?: string,
    public email?: string,
    public password?: string,
    public firstName?: string,
    public lastName?: string,
    public country?: string,
    public city?: string,
    public street?: string,
    public postcode?: string,
    public birthDate?: string,
    public roleId?: string,
    public token?: string
    ) { }
}



