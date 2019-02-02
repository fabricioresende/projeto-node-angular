import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

// Import rxjs map operator
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Projeto Node';

  
  API = 'http://localhost:3000';

  
  usuario: any[] = [];
  form: any[] = [];

  constructor(private http: Http) {}

  
  ngOnInit() {
    this.buscarTodosUsuarios();
  }

  
  adicionarUsuario(form) {
    this.http.post(`${this.API}/usuarios`, {form})
      .map(res => res.json())
      .subscribe(() => {
        this.buscarTodosUsuarios();
      })
  }

  // Get all users from the API
  buscarTodosUsuarios() {
    this.http.get(`${this.API}/usuarios`)
      .map(res => res.json())
      .subscribe(usuario => {
        console.log(usuario)
        this.usuario = usuario
      })
  }
}