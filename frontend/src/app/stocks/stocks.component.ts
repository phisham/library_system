import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  show2:any=false;
  data:any;
  oldStock:any=[];
  newStock:any=[];
  stockType:any;
  stockNumber:any;
  item:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/getAllData').subscribe((dat:any)=>{
      this.data=dat;
    })
    this.http.get('http://localhost:3000/getOldStock').subscribe((dat:any)=>{
      this.oldStock=dat;
    })
    this.http.get('http://localhost:3000/getNewStock').subscribe((dat:any)=>{
      this.newStock=dat;
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
      "token":this.item.token,
      "stockNumber":this.stockNumber
    }
    console.log(d);
    if(this.stockType=='old'){
      this.http.post('http://localhost:3000/oldStock',d).subscribe((data:any)=>{
        this.show2=false;
        console.log(data);
        this.http.get('http://localhost:3000/getOldStock').subscribe((dat:any)=>{
          this.oldStock=dat;
        })
      })
    }
    else{
      this.http.post('http://localhost:3000/newStock',d).subscribe((data:any)=>{
        this.show2=false;
        console.log(data);
        this.http.get('http://localhost:3000/getNewStock').subscribe((dat:any)=>{
          this.newStock=dat;
        })
      })
    }
  }
  setType(i:any){
    this.stockType=i;
  }
  setStockNumber(ev:any){
    this.stockNumber=ev.target.value;
  }
}
