import React, { Component } from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

class Post extends Component {
    
    confirmarBorrado = () =>{

        const {id} = this.props.info;
        Swal.fire({
            title: 'Estás seguro?',
            text: "Esta acción no es reversible!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                this.props.borrarPost(id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
          })
    }

    render() {

        const {id,title} = this.props.info;

        return (
            
            <tr>
                <td>{id}</td>
                <td>{title}</td>
                <td>
                    <Link to={`/post/${id}`} className="btn btn-primary"> Ver </Link>
                    <Link to={`/editar/${id}`} className="btn btn-warning"> Editar </Link>
                    <button type="button" className="btn btn-danger" onClick={this.confirmarBorrado} >Borrar</button>
                </td>
            </tr>
            
        )
    }
}

export default Post;