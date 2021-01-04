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
 
  products: Product[] = [];
  id = '';
  constructor(public apiService:ApiService ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.apiService.getProducts().subscribe(response => {
    const { products } = response; 
    this.products = products; 
    });
  }
 

  addProduct(): void { 
    this.apiService.addProduct(this.productForm.value).subscribe(() => {
      this.getProducts();
      this.productForm.reset('');
    })
  }


  deleteProduct(id: string): void {
    if(window.confirm("¿Estas seguro de querer eliminar?")){
       this.apiService.deleteProduct(id).subscribe(() => {   
         this.getProducts();
       },(error) => {
         console.error(error);
     })
    }        
  }

  getProduct(id: string): void {
    this.apiService.getProduct(id).subscribe(response => { 
       const { id, name, price, quantity } = response.data; 
       this.id = id;  
       this.productForm.setValue({name, price, quantity});
     },(error) => {
       console.error(error);
     })
  }

  updateProduct():void {
    const obj = this.productForm.value;
    obj.id = this.id;
    this.apiService.updateProduct(obj).subscribe(() => { 
      this.getProducts();
      this.productForm.reset('');
     },(error) => {
       console.error(error);
    })
  }
  

}//fin de la clase ProductComponent
