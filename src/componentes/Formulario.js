import React, { Component } from 'react'

class Formulario extends Component {

    tituloRef = React.createRef();
    contenidoRef = React.createRef();

    nuevoPost = (e) => {
        e.preventDefault();

        //leer los datos y crear el objeto
        const post = {
            title: this.tituloRef.current.value,
            body: this.contenidoRef.current.value,
            userId: 1
        }

        //enviar por props
        this.props.crearPost(post)

        //resetear el formulario
        e.currentTarget.reset();
    }

    render() {
        return (
            <form className="col-8" onSubmit={this.nuevoPost}>
                <legend className="text-center">
                    Crear Nuevo Post
                </legend>

                <div className="form-group">
                    <label htmlFor="titulo" >Titulo del post</label>
                    <input id="titulo" className="form-control" type="text" placeholder="Titulo del post" ref={this.tituloRef}></input>
                </div> 

                <div className="form-group">
                    <label htmlFor="cont" > Contenido</label>
                    <textarea id="cont" className="form-control" placeholder="contenido" rows="5" ref={this.contenidoRef}></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        )
    }
}

export default Formulario;
