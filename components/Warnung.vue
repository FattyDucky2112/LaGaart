<template>
  <div>
    <div class="backdrop"></div>
    <div class="error">
      <div class="fehler">
        Sind Sie sicher?
        <i class="fas fa-times" @click="$emit('close', true)"></i>
      </div>
      <div class="fehlermeldung">
        <slot />
      </div>
      <div class="button-wrapper">
        <button class="btn btn-danger" @click="$emit('loeschen', true)">Ja! Löschen</button>
        <button class="btn btn-secondary" @click="$emit('close', true)">Abbruch</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .error {
    background: white;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 500px;
    border: 1px solid black;
    transform: translate(-50%, -50%);
    z-index: 1001;    
    border-radius: 3px;    
  }

  .backdrop { 
    background-color: white;
    opacity: 0.8;
    z-index: 1000;
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .fehler {
    border-bottom: 1px solid #ccc;
    padding-top: 5px;
    padding-left: 10px;
    
    i {
      position: absolute;
      right: 4px;
      top: 2px;
      cursor: pointer;

      &:hover{
        color: black;
      }
    }
  }

  .fehlermeldung {
    padding: 20px;
    text-align: center;
  }

  .button-wrapper{
    text-align: center;
    border-top: 1px solid #ccc;

    button{
      margin: 10px;
    }
  }
  

</style>