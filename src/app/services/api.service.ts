import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment }  from '../../environments/environment';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  baseUrl = environment.baseUlr;

  constructor(public http:HttpClient ) { }

  getProducts(){
   return this.http.get<any>(this.baseUrl);
  }

  addProduct(obj:any){
    return this.http.post<Product>(this.baseUrl, obj)
  }

}
