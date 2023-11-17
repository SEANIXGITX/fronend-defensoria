<template>
  <div class="home">
    <div class="home--title">Defensoría del pueblo</div>
    <div class="home--description">Estado plurinacional de Bolivia</div>
    <q-img class="home--logo" src="../../assets/logoBig.png" />
  </div>
</template>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &--title {
    font-size: 70px;
    border-bottom: 3px solid #000000;
  }
  &--description {
    font-size: 30px;
    color: $grey-13;
  }
  &--logo {
    width: 40rem;
  }
  @media screen and (max-width: 768px) {
    /* Media query para pantallas más pequeñas */
    &--title {
      font-size: 40px;
    }

    &--description {
      font-size: 20px;
    }

    &--logo {
      width: 80%;
    }
  }

  @media screen and (max-width: 480px) {
    /* Media query para pantallas aún más pequeñas */
    &--title {
      font-size: 25px;
    }

    &--description {
      font-size: 16px;
    }
  }
}
</style>
