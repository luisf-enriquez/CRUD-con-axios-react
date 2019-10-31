import React, { Component } from 'react'

class Editar extends Component {

    tituloRef = React.createRef();
    contenidoRef = React.createRef();
    
    editarPost = (e) => {
        e.preventDefault();

        //leer los datos y crear el objeto
        const post = {
            title: this.tituloRef.current.value,
            body: this.contenidoRef.current.value,
            userId: this.props.info.userId,
            id: this.props.info.id
        }

        //enviar por props
        this.props.edicionPost(post)

        //resetear el formulario
        //e.currentTarget.reset();
    }

    cargarFormulario = () => {
        
        if (!this.props.info) {
            return null;
        }

        const {title, body} = this.props.info
        return (
            <form className="col-8" onSubmit={this.editarPost}>
                <legend className="text-center">Editar Post</legend>

                <div className="form-group">
                    <label htmlFor="titulo" >Titulo del post</label>
                    <input id="titulo" className="form-control" type="text" ref={this.tituloRef} defaultValue={title} ></input>
                </div> 

                <div className="form-group">
                    <label htmlFor="cont" > Contenido</label>
                    <textarea id="cont" className="form-control" rows="5" ref={this.contenidoRef} defaultValue={body}></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Editar</button>
            </form>
        )
    }
    
    render() {
        return (
            <React.Fragment>
                {this.cargarFormulario()}
            </React.Fragment>
        );
    }
}

export default Editar;