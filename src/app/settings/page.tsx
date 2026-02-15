"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Settings</h1>
      <p>Manage your preferences and account options.</p>

      <section style={{ marginTop: "2rem" }}>
        <h2>Appearance</h2>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Enable Dark Mode
        </label>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Notifications</h2>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          Enable Notifications
        </label>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Account</h2>
        <p>Manage your profile, password, and linked accounts here.</p>
        {/* Later: add forms for profile editing */}
      </section>
    </main>
  );
}