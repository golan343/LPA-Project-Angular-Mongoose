import { HttpHeaders } from '@angular/common/http';

const token = sessionStorage.getItem('token');
export const reqHeader = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token});



