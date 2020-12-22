import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Product } from '../models/product';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  productForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl('')
  });
 
  products: Product[] = []
 
  constructor(public apiService:ApiService ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts():void{
    this.apiService.getProducts().subscribe(response => {
    const { products } = response; 
    this.products = products; 
    });
  }
 

  addProduct():void{ 
    this.apiService.addProduct(this.productForm.value).subscribe(() => {
      this.getProducts();
      this.productForm.reset('');
    })
  }

}//fin de la clase ProductComponent
