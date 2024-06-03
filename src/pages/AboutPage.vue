<template>
  <div class="about-container">
    <h1>About Us</h1>
    <p>Welcome to Vue Recipes, your ultimate destination for discovering, sharing, and enjoying recipes from around the world. We are passionate about food and technology, and we have combined these passions to create a platform that brings culinary enthusiasts together.</p>
    
    <h2>Our Mission</h2>
    <p>Our mission is to provide a seamless and enjoyable experience for home cooks, professional chefs, and food lovers alike. We aim to foster a community where everyone can share their favorite recipes, discover new dishes, and enhance their cooking skills.</p>
    
    <h2>Who We Are</h2>
    <p>We are two software engineering students doing this project as part of a web development course. We believe in the power of technology to enhance everyday experiences. Our backgrounds in software engineering have enabled us to create Vue Recipes, a platform we are committed to continually improving to better serve our users.</p>
    
    <h2>Our Previous Works- COMPLETE!!!!!!!!!!!!!!!!!!!</h2>
    <ul class="previous-works">
      <li><a href="https://link-to-your-project-1.com" target="_blank">Project 1</a></li>
      <li><a href="https://link-to-your-project-2.com" target="_blank">Project 2</a></li>
      <li><a href="https://link-to-your-project-3.com" target="_blank">Project 3</a></li>
    </ul>
    
    <h2>Our Features</h2>
    <ul>
      <li><strong>Recipe Sharing:</strong> Share your own recipes with the community and get feedback from other cooking enthusiasts.</li>
      <li><strong>Search and Discover:</strong> Easily find recipes based on ingredients, cuisine, difficulty level, and more.</li>
      <li><strong>Personal Collections:</strong> Save your favorite recipes and create personalized collections for easy access.</li>
    </ul>
    
    <h2>Join Us</h2>
    <p>We invite you to join our growing community of food lovers. Whether you’re a novice cook looking for easy recipes or an experienced chef seeking inspiration, Vue Recipes has something for everyone. Sign up today and start your culinary adventure with us!</p>
    
    <p>Happy Cooking!</p>
    <p><strong>The Vue Recipes Team</strong></p>
  </div>
</template>

<script>
export default {
  name: 'About'
};
</script>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

h1, h2 {
  color: #42b983; /* Pastel green */
}

p {
  color: #6c757d;
  line-height: 1.6;
}

ul {
  color: #6c757d;
  margin-left: 20px;
  list-style-type: disc;
}

ul li {
  margin-bottom: 10px;
}
</style>
