<template lang="pug">
  #app
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">蕃茄鐘</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/list">待辦事項</b-nav-item>
          <b-nav-item to="/settings">設定</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    keep-alive
    router-view
</template>
