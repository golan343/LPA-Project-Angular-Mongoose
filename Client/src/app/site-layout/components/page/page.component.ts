import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { pageModel} from './../../../models/page'
import {PageService} from './../../../services/page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  page$:Observable<pageModel>;
  page:string;
  constructor( private activatedRoute: ActivatedRoute,private pageService:PageService, private router: Router ) { }

  ngOnInit(): void {
    
    let name = this.activatedRoute.snapshot.params.name;
   
    this.activatedRoute.params
    .subscribe(params => {
      name = params['name'];
      console.log(params);
      if(name){
        this.page$ = this.pageService.getPage(name).pipe(map(p=>{
          if(!p.title){
            return { title:'error Message', content:['the name' +name+' of the page is Wrong']} as pageModel;
          }
          return p;
        }));
      }else{
        this.page$ = of({ title:'error Message', content:['you are missing the page name']} as pageModel)
      }

    });


    
  }


}
