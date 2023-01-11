import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  add:any=false;
  data:any=[];
  bookname:any;
  auth:any;
  bookname1:any;
  author1:any;
  bookname2:any;
  author2:any;
  show2:any=false;
  id:any;
  show3:any=false;
  show4:any=false;
  show5:any=false;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/getAllData').subscribe((dat:any)=>{
      this.data=dat;
    })
  }
  name(ev:any){
    this.bookname=ev.target.value;
  }
  author(ev:any){
    this.auth=ev.target.value;
  }

  updatePopup(i:any){
    this.bookname1=i.bookName;
    this.author1=i.author;
    this.show2=true;
    this.id=i.token;
  }

  nameOfBook(ev:any){
    this.bookname2=ev.target.value;
  }
  authorName(ev:any){
    this.author2=ev.target.value;
  }

  deleteAll(){
    this.http.delete('http://localhost:3000/deleteAll').subscribe((data:any)=>{
      console.log(data);
      this.show4=true;

      this.data=[];

      this.http.get('http://localhost:3000/getAllData').subscribe((dat:any)=>{
        this.data=dat;
        this.show4=false;
      })
    })
  }
  gen_close(){
    this.show2=false;
    this.show3=false;
    this.show4=false;
    this.show5=false;
  }
  close(){
    let dat;
    if(this.bookname2 && this.author2){
      dat={
        bookName:this.bookname2,
        author:this.author2
      }
    }
    else if(this.bookname2 && !this.author2){
      dat={
        bookName:this.bookname2,
        author:this.author1
      }
    }
    else{
      dat={
        bookName:this.bookname1,
        author:this.author2
      }
    }
    this.http.patch('http://localhost:3000/update/'+this.id,dat).subscribe((result:any)=>{
      this.show2=false;

      this.data=[];
      this.http.get('http://localhost:3000/getAllData').subscribe((dat:any)=>{
        this.data=dat;

      })

      console.log(result);
    })
  }

  delete(i:any){
    this.http.delete('http://localhost:3000/delete/'+i.token).subscribe((data:any)=>{
      console.log(data);
      this.show4=true;
      this.data=[];
      this.http.get('http://localhost:3000/getAllData').subscribe((dat:any)=>{
        this.data=dat;
        this.show4=false;
      })
    })
  }
  addNew(){
    const data={
      bookName:this.bookname,
      author:this.auth
    }
    this.http.post('http://localhost:3000/create',data).subscribe((result:any)=>{
      console.log(result);
      this.show3=true;
      this.http.get('http://localhost:3000/getAllData').subscribe((dat:any)=>{
        this.data=dat;
        this.show3=false;
      })
      this.add=false;
    })
  }
  addbooks(){
    this.add=true;
  }
}
