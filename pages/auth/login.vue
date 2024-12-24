<template>
  <main class="w-screen min-h-screen flex flex-row">
    <!-- Left Section -->
    <section
      class="lg:w-3/5 min-h-screen hidden lg:flex lg:flex-col justify-center items-center bg-teal-400"
    >
      <div class="w-[300px] h-[300px]">
        <NuxtImg
          src="/images/kosan-vector.png"
          alt="Kosan Vector"
          class="object-cover"
        />
      </div>
      <h1 class="font-bold font-[Poppins] text-center text-6xl text-white">
        KosanIT
      </h1>
    </section>

    <!-- Right Section -->
    <section
      class="lg:w-2/5 w-full min-h-screen flex justify-center items-center font-[Poppins]"
    >
      <div class="w-full max-w-md p-6">
        <!-- Login Form -->
        <h1 class="text-2xl font-bold text-center mb-6">Login</h1>

        <!-- Form -->
        <Form
          @submit="onSubmit"
          :validation-schema="schema"
          v-slot="{ errors }"
        >
          <!-- Username or Email Input -->
          <div class="mb-4">
            <label for="username" class="block mb-1 font-medium"
              >Username or Email</label
            >
            <Field
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username or email"
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <ErrorMessage name="username" class="text-red-500 text-sm" />
          </div>

          <!-- Password Input -->
          <div class="mb-4 relative">
            <label for="password" class="block mb-1 font-medium"
              >Password</label
            >
            <Field
              id="password"
              name="password"
              :type="passwordVisible ? 'text' : 'password'"
              placeholder="Enter your password"
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute mt-2 right-3"
            >
              <Icon
                v-if="passwordVisible"
                name="material-symbols:visibility-outline-rounded"
                size="24"
              />
              <Icon
                v-else
                name="material-symbols:visibility-off-outline-rounded"
                size="24"
              />
            </button>
            <ErrorMessage name="password" class="text-red-500 text-sm" />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-teal-400 text-white py-2 rounded hover:bg-teal-500 transition duration-200"
          >
            Login
          </button>
        </Form>

        <!-- Register Redirect -->
        <p class="text-sm mt-4 text-center">
          Don't have an account yet?
          <NuxtLink
            to="/auth/register"
            class="text-teal-500 underline hover:text-teal-700"
            >Register here</NuxtLink
          >
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";

// Define the validation schema using Zod
const schema = toTypedSchema(
  z.object({
    username: z.string().min(1, "Username or Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  })
);

const router = useRouter();
const auth = useAuthStore();
const passwordVisible = ref(false);

// Toggle password visibility
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

// Form submission handler
const onSubmit = async (values) => {
  try {
    const response = await fetch(
      "https://fp-be-ax3lrods-projects.vercel.app/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      }
    );

    const result = await response.json();

    // Save to Pinia store and localStorage
    if (result.status === "success") {
      const { id, username, role } = result.data.user;
      const { token } = result.data.token;

      // Use Pinia action to store data
      auth.setUser({ id, username, role, token });

      // Redirect to the root page
      router.push("/");
    } else {
      alert(result.message || "Login failed. Please try again.");
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("An error occurred while logging in. Please try again.");
  }
};
</script>
