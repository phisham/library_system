import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  show2:any=false;
  data:any;
  priceList:any=[];
  issued:any=[]
  stockType:any;
  price:any;
  item:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/getAllData').subscribe((dat:any)=>{
      this.data=dat;
    })
    this.http.get('http://localhost:3000/getPriceList').subscribe((dat:any)=>{
      this.priceList=dat;
    })
    this.http.get('http://localhost:3000/getIssued').subscribe((dat:any)=>{
      this.issued=dat;
    })
  }
  move(i:any){
    this.show2=true;
    this.item=i;
  }
  gen_close(){
    this.show2=false;
  }
  close(){
    let d={
      "bookName":this.item.bookName,
      "price":this.price,

    }
    console.log(d);

    this.http.post('http://localhost:3000/priceList',d).subscribe((data:any)=>{
        this.show2=false;
        console.log(data);
        this.http.get('http://localhost:3000/getPriceList').subscribe((dat:any)=>{
          this.priceList=dat;
        })
    })

  }
  setType(i:any){
    this.stockType=i;
  }
  setPrice(ev:any){
    this.price=ev.target.value;
  }
  issueBook(i:any){
    let d={
      "bookName":i.bookName
    }
    this.http.post('http://localhost:3000/issued',d).subscribe((data:any)=>{
        this.show2=false;
        console.log(data);
        this.http.get('http://localhost:3000/getIssued').subscribe((dat:any)=>{
          this.issued=dat;
        })
    })
  }
}
