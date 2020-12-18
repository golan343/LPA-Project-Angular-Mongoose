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
export class errorModel extends UserModel {
    email: string;
    password: string;
    clear() {
        this.password = '';
        this.email = '';
    }
    validatePassword(passText) {
        if (!passText) {
            this.password = 'Missing Password';
            return false;
        }
        if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/g.test(passText)) {
            this.password = 'password must contain at least 8 characters one uppercase letter and one lowercase letter';
            return false;
        }
        this.password = '';
        return true;
    }
    validateEmail(EmailText) {
        if (!EmailText) {
            this.email = 'Missing Email';
            return false;
        }
        if (!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/g.test(EmailText)) {
            this.email = 'Email must be valid example@example.com';
            return false;
        }
        this.email = '';
        return true;
    }
}


