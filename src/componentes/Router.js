import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

//Componentes
import Header from './Header'
import Navegacion from './Navegacion'
import Posts from './Posts'
import SinglePost from './SinglePost'
import Formulario from './Formulario'
import Editar from './Editar'

class Router extends Component {

    state = {
        posts : [] 
    }

    componentDidMount() {
        this.obtenerPost();
    }

    obtenerPost = () => {

        //Usamos JSON placeholder para llamar datos aleatorios
        const url = `https://jsonplaceholder.typicode.com/posts`

        /*//con fetch api
        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({
                posts: data
            }))
        */

        axios.get(url)
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
        
    }

    borrarPost = (id) => {
        const url = `https://jsonplaceholder.typicode.com/posts/${id}`

        axios.delete(url)
            .then(res => {
                if (res.status === 200) {
                    const posts = [...this.state.posts]
                    let resultado = posts.filter(post =>(
                        post.id !== id
                    ))
                    this.setState({
                        posts: resultado
                    })

                } else {
                    
                }
            })
    }

    crearPost = (post) => {
        
        // con fetch
        /*
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: post.title,
                body: post.body,
                userId: post.userId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(nuevoPost => {
            this.setState({
                posts: [...this.state.posts, nuevoPost]
            })
        })
        */

        if (post.title === '' || post.body === '') {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'El post debe tener contenido!',
                footer: '<p>Llenna los dos campos </p>'
            })
            return null;
        }
        
        axios.post(`https://jsonplaceholder.typicode.com/posts`,{post})
            .then(res => {
                if (res.status === 201) {

                    Swal.fire(
                        'Post Creado!',
                        'Contenido creado correctamente!',
                        'success'
                    )
                    //se combinan los datos en un solo objeto dado que la API los retorna en atributos separados
                    //Para ello se utiliza Object.assign
                    
                    let postId = {id: res.data.id}
                    const nuevoPost = Object.assign({},res.data.post, postId)
                    this.setState({
                        posts: [...this.state.posts,nuevoPost]
                    })
                    /*
                    this.setState(prevState => ({
                        posts: [...prevState.posts, nuevoPost]
                    }))
                    */
                }
            })    
    }

    edicionPost = (postActualizado) => {
        //usando axios
        const {id} = postActualizado
        axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {postActualizado})
            .then(res => {
                if (res.status === 200) {
                    //this.obtenerPost(); // esto para un API para que guarde los cambios 
                    
                    const posts = [...this.state.posts]
                    // con FIND puedo retornar la posicion del Array que cumpla la condición
                    const posicionPost = posts.findIndex(post => post.id === id)
                    posts[posicionPost] = postActualizado

                    this.setState({
                        posts: posts
                    })

                    Swal.fire(
                        'Post Actualizado!',
                        'Se guardo correctamente.',
                        'success'
                    )
                }
            });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <div className="row justify-content-center">
                        <Header/>
                        <Navegacion/>

                        <Switch>

                            <Route exact path="/" render={()=>{
                                return (
                                    <Posts posts={this.state.posts} borrarPost={this.borrarPost}/>
                                )
                            }}/>

                            <Route exact path="/post/:postId" render={(props) => {
                    
                                let idPost = props.location.pathname.replace('/post/','');
                                /*
                                const posts = this.state.posts
                                let filtro = posts.filter(post => (
                                    post.id === idPost
                                ))
                                */
                                return(
                                    <SinglePost info={this.state.posts[idPost-1]}/>
                                )
                            }} />

                            <Route exact path="/crear" render={() => (
                                <Formulario crearPost={this.crearPost} />
                            )}/>

                            <Route  exact path="/editar/:editarId" render={(props) => {
                                let idPost = props.location.pathname.replace('/editar/','');
                                console.log(idPost);

                                return(
                                    <Editar info={this.state.posts[idPost-1]} edicionPost={this.edicionPost}/>
                                )
                            }}/>

                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
            
        )
    }
}

export default Router;
