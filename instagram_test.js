const fs = require("fs")

//CRUD 





const db = {
    path: './db.json',

    create({ id, content }) {
        try {
            const data = db.read();

            data.push({ id: id, content: content })

            fs.writeFileSync(this.path, JSON.stringify(data), 'utf8')
        } catch (err) {
            console.log("Houve um erro ao criar um objeto: " + err)
        }
    },

    read() {
        try {
            let data = fs.readFileSync(this.path, 'utf8')
            if(!data) { 
                fs.writeFileSync(this.path, JSON.stringify([]), 'utf8')
                let data = fs.readFileSync(this.path, 'utf8')
                
                return JSON.parse(data)
            }
            return JSON.parse(data)
        } catch (err) {
            console.log("Houve um erro ao ler o arquivo JSON: " + err)
        }

    },
    update(id, content) {
        try {
            let data = db.read()
            const new_data =  data.map(item => {
                if(item.id === id) {

                    return {...item, content: content}
                }
                return new_data
            })

            fs.writeFileSync(this.path, new_data, 'utf8')
            

        } catch (err) {
            console.log("Erro ao atualizar o objeto: " + err)

        }

    },
    delete(id) {

        try {
            const data = db.read()

            let new_data = data.filter((city) => city.id != id)
            
            fs.writeFileSync(this.path, JSON.stringify(new_data), 'utf8')

        } catch (err) {
                console.log("Erro ao deletar o objeto: " + err)
        }

    },


}

db.update("666", "Eu sou gay")


// CREATE



// READ




// UPDATE


// DELETE