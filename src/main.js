/**
 * main.js
 *
 * Bootstraps and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

import "@/style.css";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");
