import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  products: Product[] = []
 
  constructor(public apiService:ApiService ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts():void{
    this.apiService.getProducts().subscribe(response => {
    const { products } = response
    this.products = products; 
    });
  }
 

}//fin de la clase ProductComponent
