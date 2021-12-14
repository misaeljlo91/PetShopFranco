let documentURL = window.location.pathname.split("/").pop()

const app = Vue.createApp({
    data(){
        return{
            listaProductos: [],
            listaJuguetes: [],
            listaFarmacia: [],
            cargar: true,
            filtrarProducto: [],
            noHayProducto: false,
            busqueda: "",
        }
    },
    created(){
        fetch("https://apipetshop.herokuapp.com/api/articulos")
            .then(response => response.json())
            .then(dataProductos => {
                this.listaProductos = dataProductos.response

                this.listaJuguetes = this.listaProductos.filter(producto => producto.tipo === "Juguete")
                this.listaFarmacia = this.listaProductos.filter(producto => producto.tipo === "Medicamento") 

                this.cargar = !this.cargar
                this.busquedaProducto
            })
            .catch(error => console.error(error.message))
    },
    methods:{
        
    },
    computed:{
        busquedaProducto(){
            if(documentURL === "juguetes.html"){
                this.filtrarProducto = this.listaJuguetes.filter(producto => producto.nombre.toLowerCase().includes(this.busqueda.toLowerCase()))
                this.noHayBusqueda
                return this.filtrarProducto
            }
            if(documentURL === "farmacia.html"){
                this.filtrarProducto = this.listaFarmacia.filter(producto => producto.nombre.toLowerCase().includes(this.busqueda.toLowerCase()))
                this.noHayBusqueda
                return this.filtrarProducto
            }
        },
        noHayBusqueda(){
            if(this.filtrarProducto.length === 0){
               return this.noHayProducto = true
            }else{
                return this.noHayProducto = false
            }
        },
        /* orderVotes(array, order, property){
            this.busquedaProducto
            if(order === "DOWN"){
                return array.sort((a, b) => {
                    if(a[property] == b[property]){
                        return 0
                    }if(a[property] < b[property]){
                        return -1
                    }
                    return 1
                })
            }
            if(order === "UP"){
                return array.sort((a, b) => {
                    if(a[property] == b[property]){
                        return 0
                    }
                    if(a[property] > b[property]){
                        return -1
                    }
                    return 1
                })
            }
        } */
    }
})
app.mount("#app")