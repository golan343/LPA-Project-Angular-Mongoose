
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
    bid: string;
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
    validate(constrain: validationConstrains) {
        if (!constrain.content && constrain.isRequire) {
            this[constrain.prop] = constrain.errorMsg;
            return false;
        }
        if (constrain.pattarn) {
            if (!constrain.pattarn.test(constrain.content)) {
                this[constrain.prop] = constrain.pattarnErrorMsg;
                return false;
            }
        }
        if (typeof constrain.callMethod == 'function') {
            if (constrain.callMethod()) {
                this[constrain.prop] = constrain.methodMsg;
                return false;
            }
        }
        this[constrain.prop] = '';
        return true;
    }
    clear(val: string) {
        this[val] = '';
    }
}
export class validationConstrains {
    constructor(args: any) {
        this.isRequire = args.isReqire || false;
        this.prop = args.prop;
        this.content = args.content;
        this.errorMsg = args.errorMsg;
        this.pattarn = args.pattarn || null;
        this.pattarnErrorMsg = args.pattarnErrorMsg;
        this.callMethod = args.callMethod || null
        this.methodMsg = args.methodMsg;
    }
    isRequire: boolean;
    prop: string;
    content: string;
    pattarn: RegExp;
    errorMsg: string;
    pattarnErrorMsg: string;
    callMethod: any;
    methodMsg: string;
}


