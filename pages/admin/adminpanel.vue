<template>
  <div>
    <Navbar/>
    <Optionmenu/>
   
  </div>
</template>

<script>
import Navbar from '~/layouts/components/admin_components/navbar'
import Optionmenu from '~/layouts/components/admin_components/optionmenu'
export default {
  components: {Navbar, Optionmenu},
  layout: 'admin_layout',
  middleware: 'auth'
}
</script>