import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { pageModel } from 'src/app/models/page';
import { PageService } from 'src/app/services/page.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CMSComponent implements OnInit {
  pagesSubscription = new Subscription();
  pages$:Observable<pageModel[]>;
  current:pageModel;
  constructor(private pagsService:PageService,public admin:AdminService) { }

  ngOnInit(): void {
    this.pages$ = this.pagsService.getAllPages().pipe(tap(pageResult=>{
      this.current = pageResult[0];
    }));

  }
  showPage(page:pageModel){
    this.current = page;
  }
  setPara($event:any,index){
   this.current.content[index] = $event.target.innerHTML.replace(/<[^>]*>/g, '');
  }
  setTitle($event){
    this.current.title = $event.target.innerText;
  }
  editPost(){
    this.admin.pageUpdate(this.current).subscribe(result=>{
      this.admin.errorSubject.next(JSON.stringify(result));
      this.pages$.subscribe(result=>{
        this.current = result[0];
      })
    }, 
    error=>{
      this.admin.errorSubject.next(JSON.stringify(error));
    }
    )
  }
  addParagraph(){
    this.current.content.push("")
    const elem = document.querySelector('.content p:last-of-type') as HTMLElement;
    elem.focus();
  }


}
