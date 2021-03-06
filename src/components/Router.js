import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Nosotros from './Nosotros/Nosotros';
import Productos from './Productos/Productos';
import Header from './Header/Header';
import Error from './Error/Error';
import SingleProducto from './SingleProducto/SingleProducto'
import Navegacion from './Navegacion/Navegacion'
import Contacto from './Contacto/Contacto'
import infoProductos from './../data/datos.json'

class Router extends Component {

  state = {
    productos : [],
    terminoBusqueda: ''
  }

  componentWillMount() {
    this.setState({
      productos: infoProductos
    })
  }

  busquedaProducto = (busqueda) => {
    if(busqueda.length > 3) {
        this.setState({
          terminoBusqueda: busqueda
        })
    } else {
      this.setState({
        terminoBusqueda: ''
      })

    }
  }

  render() {

    let productos = [...this.state.productos];

    let busqueda = this.state.terminoBusqueda;

    let resultado;

    if(busqueda !== '') {
      resultado = productos.filter(producto => (
        producto.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1
      ))
    } else {
      resultado = productos
    }


    return (
      <BrowserRouter>
        <React.Fragment>
        <Header />
        <Navegacion />

        {/* todo lo que tiene que ver con routing here       */}

        <Switch>
            <Route exact path="/" render={() => (
              <Productos productos={resultado} busquedaProducto={this.busquedaProducto} />
            )} />

            <Route exact path="/producto/:productoId" render={(props)=> {
              let idProducto = props.location.pathname.replace('/producto/', '');
              return (
                <SingleProducto producto={this.state.productos[idProducto]} />
              )
            }} />

            <Route exact path="/productos" render={()=> (

            <Productos productos={resultado} busquedaProducto={this.busquedaProducto}  />

            )} />

            <Route exact path="/nosotros" component={Nosotros} />
            <Route exact path="/contacto" component={Contacto} />
            <Route component={Error} />

        </Switch>
        </React.Fragment>


      </BrowserRouter>
    );
  }
}

export default Router;
