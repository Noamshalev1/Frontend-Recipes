<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Vue Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      <router-link :to="{ name: 'about' }">About</router-link>|
      <!-- {{ !$root.store.username }} -->
      <span v-if="!$root.store.username">
        <h1 class="user-greeting">Hello, Guest</h1>|
        <router-link class="highlight-button" :to="{ name: 'register' }">Register</router-link>|
        <router-link class="highlight-button" :to="{ name: 'login' }">Login</router-link>
      </span>
      <span v-else>
        <router-link :to="{ name: 'newRecipe' }">Add new Recipe</router-link>|
        <b-dropdown id="dropdown-left" text="Personal Info" variant="primary" class="m-2">
        <b-dropdown-item href="#"><router-link :to="{ name: 'favorites' }">Favorites</router-link></b-dropdown-item>
        <b-dropdown-item href="#"><router-link :to="{ name: 'myrecipes' }">My Recipes</router-link></b-dropdown-item>
        <b-dropdown-item href="#"><router-link :to="{ name: 'familyrecipes' }">Family Recipes</router-link></b-dropdown-item>
        </b-dropdown>
        <h1 class="user-greeting">Hello, {{ $root.store.username }}</h1>|
        <button @click="Logout">Logout</button>
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      localStorage.removeItem('lastSearch');
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center; /* Align items vertically */
}

#nav a,
#nav span,
#nav button,
#nav .dropdown-toggle { /* Ensure all elements have the same alignment properties */
  font-weight: bold;
  color: #6c757d;
  text-decoration: none;
  margin: 0 10px; /* Adjust margin for better spacing */
  transition: color 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center; /* Align text and elements vertically */
  font-size: 20px;
}
#nav .dropdown-toggle {
  margin-right: -10px;
}

#nav a:hover,
#nav button:hover,
#nav .dropdown-toggle:hover {
  color: #42b983;
  transform: scale(1.1);
}

#nav a.router-link-exact-active {
  color: #ff6f61;
}

#nav button {
  background: none;
  border: none;
  cursor: pointer;
}

.highlight-button {
  background-color: #ffb6c1; /* Light pastel pink */
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  margin: 0 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.highlight-button:hover {
  background-color: #ff6f61; /* Darker pastel pink */
  transform: scale(1.1);
  color: #fff;
}

.user-greeting {
  font-size: 1.1em;
  color: #42b983; /* Pastel green */
  margin: 0 10px;
  font-weight: normal;
}

</style>
