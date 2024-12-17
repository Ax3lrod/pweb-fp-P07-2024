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
      class="lg:w-2/5 w-full min-h-screen flex justify-center items-center"
    >
      <div class="w-full max-w-md p-6">
        <!-- Register Form -->
        <h1 class="text-2xl font-bold text-center mb-6">Register</h1>

        <!-- Form -->
        <Form
          @submit="onSubmit"
          :validation-schema="schema"
          v-slot="{ errors }"
        >
          <!-- Username Input -->
          <div class="mb-4">
            <label for="username" class="block mb-1 font-medium"
              >Username</label
            >
            <Field
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <ErrorMessage name="username" class="text-red-500 text-sm" />
          </div>

          <!-- Email Input -->
          <div class="mb-4">
            <label for="email" class="block mb-1 font-medium">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <ErrorMessage name="email" class="text-red-500 text-sm" />
          </div>

          <!-- Password Input -->
          <div class="mb-4">
            <label for="password" class="block mb-1 font-medium"
              >Password</label
            >
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <ErrorMessage name="password" class="text-red-500 text-sm" />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-teal-400 text-white py-2 rounded hover:bg-teal-500 transition duration-200"
          >
            Register
          </button>
        </Form>

        <!-- Login Redirect -->
        <p class="text-sm mt-4 text-center">
          Already have an account?
          <NuxtLink
            to="/auth/login"
            class="text-teal-500 underline hover:text-teal-700"
            >Login here</NuxtLink
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
import { useRouter } from "vue-router";

// Validation schema using Zod
const schema = toTypedSchema(
  z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  })
);

const router = useRouter();

// Form submission handler
const onSubmit = async (values) => {
  try {
    const response = await fetch(
      "https://fp-be-ax3lrods-projects.vercel.app/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
          role: "USER", // Static role value
        }),
      }
    );

    const result = await response.json();
    //console.log("Register Response:", result);

    if (result.status === "success") {
      alert("Registration successful! Redirecting to login...");
      router.push("/auth/login");
    } else {
      // Show server-provided error message or a default message
      alert(result.message || "Registration failed. Please try again.");
    }
  } catch (error) {
    //console.error("Register Error:", error);
    alert("An error occurred while registering. Please try again.");
  }
};
</script>
