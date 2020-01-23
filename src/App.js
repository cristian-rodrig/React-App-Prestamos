import React, {
  Component, Fragment
} from 'react';
import './normalize.css';
import './skeleton.css';
import Formulario from './componentes/Formulario';
import { calcularTotal } from './helpers';
import Resultado from './componentes/Resultado';
import Mensaje from './componentes/Mensajes';
import Spinner from './componentes/Spinner';

class App extends Component {

  state = {
    total:'',
    cantiad:'',
    plazo:'',
    cargando:false
  }

  datosPrestamo = (cantidad, plazo) =>{
    const total = calcularTotal(cantidad,plazo);

    //colocar el resultado en el state junto a la cantidad y el plazo
    this.setState({
      cargando:true
    },() =>{
     setTimeout(()=>{
      this.setState({
        total,
        cantidad,
        plazo,
        cargando:false
      })
     },3000);
    })
  }


  render() {
    const {total, plazo, cantidad, cargando} = this.state;

    //carga un componente condicionalmente
    let componente;
    if(total==='' && !cargando){
      componente= <Mensaje/>
    }else if (cargando){
      componente = <Spinner/>
    }else{
      componente= <Resultado
                  total={total}
                  plazo={plazo}
                  cantidad={cantidad}
                />
    }

    return( 
      <Fragment>
        <h1>Cotizador de prestamos</h1>
        <div className ='container'>
           <Formulario 
            datosPrestamo={this.datosPrestamo}
          />

          <div className="mensajes">
            {componente}
                   
          </div>
        </div>
      </Fragment>
      // fragment sirve para no crear div o otra etiqueta y poder mostrar mas de una vez el componente Formulario. Si solo se muestra una vez no es necesario rodearlo con fragment
    );
  }
}

export default App;