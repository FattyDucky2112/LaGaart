<template>
  <div>
    <Navbar/>
    <Fehlermeldung v-if="error" @close="error=''">{{error}}</Fehlermeldung>
    <Warnung v-if="deleteID > 0" @close="deleteID= -1" @loeschen="deleteEntry">Wenn Sie die Kategorie löschen werden alle der Kategorie zugehörigen Bilder ebenfalls gelöscht!</Warnung>
    
    <div class="container" style="margin-top: 50px ">
      <table class="table-wrapper">
        <thead>
          <tr>
            <th style="width:  100px;">Index</th>
            <th>Kategorie</th>
            <th>Datenbankkategorie</th>
            <th style="width:  100px;">Aktion</th>
            
          </tr>
        </thead>
        <tbody is="transition-group" name="table-row" :class="{ 'edit-mode': editID >= 0 }">
          <tr v-for="(category, index) of categories" :key="category.id" :class="{active: editID === category.id}">
            <td>{{index + 1}}</td>
            <template v-if="category.id === editID">
              <td><input ref="editInput" type="text" v-model="newCatName" @input="editInput"></td>
              <td>{{editDbCategory}}</td>
            </template>
            <template v-else>
              <td>{{category.name}}</td>            
              <td>{{category.path}}</td>
            </template>
            <td class="categoryaction">

            <template v-if="category.id === editID">
              <i class="fas fa-check text-success" @click="saveEdit"></i>
              <i class="fas fa-times text-danger" @click="editID = -1"></i> 
            </template>
            <template v-else>
              <i class="far fa-edit" @click="editCat(category.id)"></i>
              <i class="far fa-trash-alt text-danger" @click="deleteID = category.id"></i>
            </template>
            </td>   
          </tr>
          <tr key="new" v-show="editID === -1">
            <td>{{ categories.length + 1 }}</td>
            <td><input type="text" v-model="newCategory" @input="onInput"></td>
            <td>{{newDbCategory}}</td>
            <td><button class="btn btn-success" @click="onSubmit">Erstellen</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  input {
    width: 100%;
    text-align: center;
  }

  .table-wrapper{
    width: 100%;
    text-align: center;
    th, td {
      border: 1px solid #ccc;
    }
  }


  .table-row-enter-active {
    transition: all 2s ease-in;
  }
  
  .table-row-enter {
    background: rgba(0, 128, 0, 0.466);
  }

  .categoryaction i {
    cursor: pointer;
    
    &:first-child {
      margin-right: 10px;
    }
  }

  .edit-mode tr:not(.active) td {
    position: relative;
    
    &:after{
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(204, 204, 204, 0.164);
    }
  }
</style>

<script>
import Navbar from '~/layouts/components/admin_components/navbar'
import Fehlermeldung from '~/components/Fehlermeldung'
import Warnung from '~/components/Warnung'
export default {
  components: {Navbar, Fehlermeldung, Warnung},
  layout: 'admin_layout',
  middleware: 'auth',


  async asyncData({app}) {
  
    let { data } = await app.$axios.get('/admin/categories')
    return {
      categories: data
    }
  }, 
  data() {
    return {
      newCategory: "",
      newDbCategory: "",
      error: "",
      deleteID: -1,
      editID: -1,
      newCatName: '',
      editDbCategory: '',
    }
  },
  methods: {
    


    editCat(id) {
      
      let index = this.categories.findIndex(category => category.id === id)

      if(index < 0) {
        throw new Error("Category index not found")
      }

      this.editID = id
      this.newCatName = this.categories[index].name

      this.editInput()

      this.$nextTick(() => {
        this.$refs.editInput[0].focus()
      })
    },

    saveEdit() {

      let editID = this.editID
      this.editID = -1

      this.$axios({
        method: 'post',
        url: '/admin/categories',
        params: {
          action: 'edit',
          editID: editID,
        },
        data: {
          name: this.newCatName,
          path: this.editDbCategory,
        }
      })
      .then(res => {
    
        let index = this.categories.findIndex(category => category.id === editID)
        if (index >= 0){
          this.$set(this.categories[index], index)

          let entry = this.categories[index]
          entry.name = this.newCatName
          entry.path =  this.editDbCategory

          this.$set(this.categories, index, entry)
        }
    
      })
      .catch(e => {
        console.error(e)
        this.error = e.response.data || 'Unbekannter Fehler'
      })

    },

    validateDBName(input) {

      input = input.toLowerCase()
      input = input.replace(/ä/g,"ae")
      input = input.replace(/ö/g,"oe")
      input = input.replace(/ü/g,"ue")
      input = input.replace(/ß/g,"ss")
      input = input.replace(/[^a-z0-9]/g, "-")
      input = input.replace(/-{1,}/g, "-")

      return input

    },

    editInput() {
      this.editDbCategory = this.validateDBName(this.newCatName)
    },

    onInput() {
      this.newDbCategory = this.validateDBName(this.newCategory)
    },
    async onSubmit() {

      this.$axios({
        method: 'post',
        url: '/admin/categories',
        params: {
          action: 'insert'
        },
        data: {
          name: this.newCategory,
          path: this.newDbCategory
        }
      }).then(res => {

        let newEntry = res.data.newID

        this.categories.push({
          id:newEntry,
          name: this.newCategory,
          path: this.newDbCategory
        })

        this.newCategory = ''
        this.newDbCategory = ''


      })
      .catch(e => {
        console.error(e)
        this.error = e.response.data || 'Unbekannter Fehler'
      })
      
    },

    deleteEntry() {
      
      let deleteID = this.deleteID
      this.deleteID = -1
           
      this.$axios.get('/admin/categories',
        {
          params: {
            action: 'delete',
            deleteID: deleteID
          }
        }
      )
      .then(res => {
        let index = this.categories.findIndex(category => category.id === deleteID)
    
        if (index >= 0){
          this.$delete(this.categories, index)
        }
      })
      .catch(e => {
        console.error(e)
        this.error = e.response.data || 'Unbekannter Fehler'
      })

    }
  }
}
</script>

